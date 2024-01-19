export const simulateUser = async () => {
  const puppeteer = require("puppeteer");
  let browser, page;

  try {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    // Navigate to the URL
    await page.goto("https://ganshelshoshanim.com/");
  } catch (error) {
    console.error("Error during scraping:", error);
    return null; // You can handle the error or return a specific value
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
