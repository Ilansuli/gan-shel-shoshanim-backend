import puppeteer from "puppeteer";

const visitWebsite = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Replace 'your_website_url' with the actual URL of your webpage
  await page.goto("www.ganshelshoshanim.com");

  // Wait for the page to load, adjust the timeout as needed
  await new Promise((r) => setTimeout(r, 3000));

  // Close the browser
  await browser.close();
};

// Set the interval (in milliseconds) at which you want to visit the website
const visitInterval = 10 * 60 * 1000; // 10 minutes

// Function to repeatedly visit the website at specified intervals
export const simulateUserActivity = () => {
  visitWebsite(); // Initial visit

  // Schedule subsequent visits at the specified interval
  setInterval(() => {
    visitWebsite();
  }, visitInterval);
};
