/**
 * Captures the Friday Inventory product screenshots used on /friday-inventory.
 *
 * Needs the Friday dev servers running:
 *   cd ../friday/backend && source .venv/bin/activate && python manage.py runserver 8000
 *   cd ../friday/frontend && npm run dev          # http://localhost:3000
 *
 * Then:
 *   node scripts/capture-friday-shots.mjs
 *
 * Logs in with the demo owner account seeded by `manage.py seed_demo`, so it
 * only ever touches local demo data. Output lands in public/screenshots/.
 */

import { mkdir } from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright-core";

const APP = process.env.FRIDAY_URL ?? "http://localhost:3000";
const EMAIL = process.env.FRIDAY_EMAIL ?? "owner@friday.app";
const PASSWORD = process.env.FRIDAY_PASSWORD ?? "owner123";
const OUT = path.join(process.cwd(), "public", "screenshots");

const SHOTS = [
  { file: "friday-dashboard.png", route: "/dashboard" },
  { file: "friday-inventory.png", route: "/products" },
];

/** Hides the Next.js dev-tools badge so it doesn't land in the screenshots. */
const HIDE_DEV_OVERLAY = `
  nextjs-portal,
  [data-nextjs-toast],
  #__next-build-watcher { display: none !important; }
`;

async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch({
    channel: "chrome",
    args: ["--hide-scrollbars"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  await context.addInitScript((css) => {
    const apply = () => {
      const style = document.createElement("style");
      style.textContent = css;
      document.head?.appendChild(style);
    };
    if (document.head) apply();
    else document.addEventListener("DOMContentLoaded", apply);
  }, HIDE_DEV_OVERLAY);

  const page = await context.newPage();

  console.log(`Logging in to ${APP} as ${EMAIL}`);
  await page.goto(`${APP}/login`, { waitUntil: "domcontentloaded" });
  await page.fill("#email", EMAIL);
  await page.fill("#password", PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL((url) => !url.pathname.startsWith("/login"), {
    timeout: 30_000,
  });
  console.log(`Logged in, landed on ${new URL(page.url()).pathname}`);

  for (const shot of SHOTS) {
    const target = `${APP}${shot.route}`;
    try {
      await page.goto(target, { waitUntil: "networkidle", timeout: 30_000 });
    } catch {
      // networkidle can hang on dev servers with open sockets; the load is
      // usually done by then, so carry on and let the screenshot decide.
      console.warn(`  ${shot.route}: network stayed busy, continuing`);
    }
    // Let data fetches and any entrance animation settle.
    await page.waitForTimeout(2500);

    const out = path.join(OUT, shot.file);
    await page.screenshot({ path: out });
    console.log(`  ${shot.route} -> public/screenshots/${shot.file}`);
  }

  // Point of sale: open the Sell dialog on a product page. This only opens the
  // dialog — it is never submitted, so no sale is recorded.
  // The product list rows aren't anchors, so open one by clicking it. Skip rows
  // priced at zero — a POS screenshot totalling ৳0.00 sells nothing.
  await page
    .locator("tbody tr")
    .filter({ hasNotText: "৳0.00" })
    .first()
    .click();
  await page
    .waitForURL(/\/products\/\d+/, { timeout: 15_000 })
    .catch(() => null);

  const productPath = new URL(page.url()).pathname;

  if (/^\/products\/\d+/.test(productPath)) {
    await page.waitForTimeout(2000);
    const sell = page.getByRole("button", { name: /^sell$/i }).first();
    if (await sell.isEnabled().catch(() => false)) {
      await sell.click();
      await page.waitForTimeout(1500);
    } else {
      console.warn("  Sell button unavailable — capturing the product page alone");
    }
    await page.screenshot({ path: path.join(OUT, "friday-pos.png") });
    console.log(`  ${productPath} (Sell) -> public/screenshots/friday-pos.png`);
  } else {
    console.warn("  no product link found — skipped the POS shot");
  }

  // The receipt lives at /receipt/<id>, so pick a real sale off the sales list.
  await page.goto(`${APP}/sales/all`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  const receiptPath = await page
    .locator('a[href^="/receipt/"]')
    .first()
    .getAttribute("href")
    .catch(() => null);

  if (receiptPath) {
    // The receipt is a narrow centred card, so a 1440px-wide shot is mostly
    // empty page. Narrow the viewport to let the card fill the frame.
    await page.setViewportSize({ width: 1000, height: 625 });
    await page.goto(`${APP}${receiptPath}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(OUT, "friday-receipt.png") });
    console.log(`  ${receiptPath} -> public/screenshots/friday-receipt.png`);
  } else {
    console.warn("  no receipt link found on /sales/all — skipped the receipt shot");
  }

  await browser.close();
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
