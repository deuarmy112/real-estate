const puppeteer = require('puppeteer');

(async () => {
  const url = process.env.URL || 'http://localhost:4173/';
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(20000);
  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
    // wait a short time for SPA to hydrate and fetch data
    await page.waitForTimeout(2500);
    const videos = await page.$$eval('video', els => els.map(v => ({ src: v.currentSrc || v.src, controls: v.hasAttribute('controls') })) );
    console.log('videos found:', videos.length);
    videos.forEach((v, i) => console.log(`#${i+1}:`, v.src));
  } catch (err) {
    console.error('ERROR', err.message);
  } finally {
    await browser.close();
  }
})();
