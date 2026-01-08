const puppeteer = require('puppeteer');

(async () => {
  const url = process.env.URL || 'http://localhost:4173/create';
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1500));
    if (errors.length === 0) console.log('No console errors');
    else { console.log('Console errors:'); errors.forEach(e=>console.log(e)); }
  } catch (err) {
    console.error('ERROR', err.message);
  } finally {
    await browser.close();
  }
})();
