const { chromium } = require('C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const results = [];
  for (const [width, height] of [[1867, 789], [1440, 900], [1024, 768], [390, 844], [320, 700]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    await page.goto(pathToFileURL(path.resolve('dist/index.html')).href, { waitUntil: 'load' });
    const geometry = await page.evaluate(() => {
      const card = document.querySelector('.hero-card').getBoundingClientRect();
      const button = document.querySelector('.hero-cta .button').getBoundingClientRect();
      const copy = document.querySelector('.hero-copy').getBoundingClientRect();
      const caption = document.querySelector('.hero-caption').getBoundingClientRect();
      return { cardBottom: Math.round(card.bottom), buttonBottom: Math.round(button.bottom), copyBottom: Math.round(copy.bottom), captionTop: Math.round(caption.top), fits: button.bottom <= card.bottom - 10 && copy.bottom <= card.bottom - 10 };
    });
    results.push({ width, height, ...geometry });
    if (width === 1867) await page.screenshot({ path: 'design/hero-fit-1867x789.png', fullPage: true });
    await page.close();
  }
  await browser.close();
  console.log(JSON.stringify(results, null, 2));
  if (results.some(r => !r.fits)) process.exitCode = 1;
})().catch(e => { console.error(e); process.exit(1) });
