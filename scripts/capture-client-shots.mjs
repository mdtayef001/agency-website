/**
 * Screenshots the live client sites for the case-study cards and pages.
 *
 *   node scripts/capture-client-shots.mjs
 *
 * Re-run it whenever a client redesigns, and the portfolio stays current.
 * Output goes to public/screenshots/.
 */

import { mkdir } from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright-core";

const BRAVE = process.env.BRAVE_PATH ?? "/usr/bin/brave-browser";
const OUT = path.join(process.cwd(), "public", "screenshots");

const SITES = [
  { file: "baindee.png", url: "https://baindee.com/home/" },
  { file: "cjshop.png", url: "https://cjshop.org/" },
];

async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch({
    executablePath: BRAVE,
    args: ["--hide-scrollbars"],
  });
  const context = await browser.newContext({
    // 16:10 to match the aspect ratio the cards render at.
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  for (const site of SITES) {
    try {
      await page.goto(site.url, { waitUntil: "load", timeout: 60_000 });
    } catch {
      console.warn(`  ${site.url}: slow load, continuing`);
    }

    // Give lazy-loaded hero imagery and web fonts a chance to arrive.
    await page.waitForTimeout(4000);
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);

    await page.screenshot({ path: path.join(OUT, site.file) });
    console.log(`  ${site.url} -> public/screenshots/${site.file}`);
  }

  await browser.close();
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
