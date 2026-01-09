const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('[page-console]', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('[page-error]', err.toString()));
    page.on('requestfailed', req => console.log('[request-failed]', req.url(), req.failure && req.failure().errorText));

    const port = process.env.PORT || 4173;
    const url = `http://localhost:${port}/`;
    console.log('Opening', url);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000 }).catch(e => console.log('goto error', e && e.message));
    // wait a bit for client-side logs
    await page.waitForTimeout(1500);

    // capture some DOM snapshot
    const html = await page.evaluate(() => document.documentElement.innerHTML.slice(0, 4000));
    console.log('DOM snapshot (truncated):\n', html);

    await browser.close();
  } catch (err) {
    console.error('puppeteer error', err && err.stack || err);
    process.exit(1);
  }
})();