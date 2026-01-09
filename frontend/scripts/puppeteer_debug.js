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
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 }).catch(e => console.log('goto error', e && e.message));

    // wait for root to be present and for React to mount
    try {
      await page.waitForSelector('#root', { timeout: 8000 });
    } catch (e) {
      console.log('selector #root not found', e && e.message);
    }

    // capture some DOM snapshot (mounted content)
    const html = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root ? root.innerHTML.slice(0, 4000) : document.documentElement.innerHTML.slice(0, 4000);
    });
    console.log('DOM snapshot (truncated):\n', html);

    await browser.close();
  } catch (err) {
    console.error('puppeteer error', err && err.stack || err);
    process.exit(1);
  }
})();