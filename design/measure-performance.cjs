const { chromium } = require('C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const files = [];
  page.on('response', async response => {
    const request = response.request();
    const type = request.resourceType();
    if (['font', 'image', 'stylesheet', 'script'].includes(type)) files.push({ url: response.url(), type, status: response.status(), bytes: Number(response.headers()['content-length']) || 0 });
  });
  await page.goto(pathToFileURL(path.resolve('dist/index.html')).href, { waitUntil: 'load' });
  await page.waitForTimeout(3200);
  const perf = await page.evaluate(() => ({
    navigation: performance.getEntriesByType('navigation').map(n => ({ domContentLoaded: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd) })),
    resources: performance.getEntriesByType('resource').map(r => ({ name: r.name, duration: Math.round(r.duration), bytes: r.transferSize })),
    fontReady: document.fonts.status,
    imagesLoaded: [...document.images].map(i => ({ url: i.src, loaded: i.complete && !!i.naturalWidth })),
  }));
  console.log(JSON.stringify({ files, perf }, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1) });
