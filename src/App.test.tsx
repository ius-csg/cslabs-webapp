
import puppeteer from 'puppeteer';


describe('Home Page', () => {
  test('Lands on the explore page', async () => {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();

    await page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000');
    await page.waitForSelector('#page-title');

    const html = await page.$eval('#page-title', e => e.innerHTML);
    expect(html).toBe('Explore');

    await browser.close();
  }, 16000);
});
