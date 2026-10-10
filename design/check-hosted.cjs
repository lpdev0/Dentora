const { chromium } = require('C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [], failures = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400 && r.url().includes('hostingersite.com')) failures.push({ url: r.url(), status: r.status() }); });
  await page.goto('https://papayawhip-marten-581888.hostingersite.com/', { waitUntil: 'networkidle' });
  for (let y = 0; y < await page.locator('body').evaluate(e => e.scrollHeight); y += 700) { await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(80); }
  const headings = await page.locator('main h1, main h2, main h3').allTextContents();
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: 'design/hosted-before.png', fullPage: true });
  const report = { errors, failures, headings };
  fs.writeFileSync('design/hosted-diagnosis.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
