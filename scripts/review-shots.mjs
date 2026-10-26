/**
 * Screenshots every page of this site in Brave, desktop and mobile, so layout
 * can be reviewed without clicking through by hand.
 *
 *   npm run dev -- --port 3100
 *   node scripts/review-shots.mjs
 *
 * Output goes to .review/ (git-ignored). Console errors are printed per page.
 */

import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright-core";

const BASE = process.env.REVIEW_URL ?? "http://localhost:3100";
const BRAVE = process.env.BRAVE_PATH ?? "/usr/bin/brave-browser";
const OUT = path.join(process.cwd(), ".review");

const ROUTES = [
  ["home", "/"],
  ["services", "/services"],
  ["work", "/work"],
  ["work-baindee", "/work/baindee"],
  ["friday", "/friday-inventory"],
  ["about", "/about"],
  ["contact", "/contact"],
  ["404", "/this-page-does-not-exist"],
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

/**
 * Scroll-triggered reveals only fire once an element enters the viewport, and a
 * fullPage screenshot doesn't scroll. Walk down the page, then back to the top,
 * so every section has animated in before the capture.
 */
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch({
    executablePath: BRAVE,
    // Software GL so the hero's WebGL still renders in a headless browser.
    args: ["--hide-scrollbars", "--use-gl=angle", "--use-angle=swiftshader"],
  });

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 2,
      // Capture the full page without waiting on scroll-triggered reveals.
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    const problems = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") problems.push(`console: ${msg.text()}`);
    });
    page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));

    for (const [name, route] of ROUTES) {
      problems.length = 0;
      await page.goto(`${BASE}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 60_000,
      });
      await page.waitForTimeout(1500);
      await scrollThrough(page);

      // Horizontal overflow is the classic responsive bug and is easy to miss
      // in a screenshot, so measure it rather than eyeball it.
      const overflow = await page.evaluate(() => {
        const el = document.documentElement;
        return el.scrollWidth - el.clientWidth;
      });
      if (overflow > 0) problems.push(`overflows horizontally by ${overflow}px`);

      const file = path.join(OUT, `${viewport.name}-${name}.png`);
      await page.screenshot({ path: file, fullPage: true });

      const flag = problems.length ? `  ⚠ ${problems.join(" | ")}` : "";
      console.log(`${viewport.name.padEnd(7)} ${route.padEnd(28)} ok${flag}`);
    }

    await context.close();
  }

  await captureScrollSequence(browser, { name: "desktop", width: 1440, height: 900 });
  await captureScrollSequence(browser, { name: "mobile", width: 390, height: 844 });

  await browser.close();
  console.log(`\nScreenshots in ${OUT}`);
}

/**
 * The home page pins sections while scrolling, which makes a `fullPage`
 * capture meaningless — a pinned element is transformed, so it smears or
 * vanishes in the stitched image. Step through real scroll positions instead.
 */
async function captureScrollSequence(browser, viewport) {
  const dir = path.join(OUT, `scroll-${viewport.name}`);
  await mkdir(dir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const problems = [];
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(m.text());
  });
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));

  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  // SplitText measures after webfonts land; give them time.
  await page.waitForTimeout(3500);

  const height = await page.evaluate(() => document.body.scrollHeight);
  const steps = 12;
  console.log(`\nscroll  / ${viewport.name} (${height}px, ${steps} frames)`);

  for (let i = 0; i < steps; i++) {
    const y = Math.round((height - viewport.height) * (i / (steps - 1)));
    await page.evaluate((top) => window.scrollTo({ top, behavior: "auto" }), y);
    // Lenis easing plus scrubbed timelines need a beat to settle.
    await page.waitForTimeout(1300);
    await page.screenshot({
      path: path.join(dir, `${String(i).padStart(2, "0")}.png`),
    });
  }

  for (const problem of new Set(problems)) console.log(`  ⚠ ${problem}`);
  await context.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
