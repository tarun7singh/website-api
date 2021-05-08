import { launch } from "puppeteer";
export default async function scraper(url: string, selector: string) {
  let browser = await launch({
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(url);
    await page.waitForSelector(selector);
    let select = await page.$(selector);
    return await page.evaluate((e) => e.textContent, select);
  } catch (error) {
    throw new Error("Puppeteer Error Occurred");
  } finally {
    browser.close();
  }
}
