import { Request, Response, NextFunction } from "express";
import { launch } from "puppeteer";

export async function puppy(req: Request, res: Response) {
  let browser = await launch({
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();

    await page.goto("https://www.bluedart.com/how-to-track");

    await page.setViewport({ width: 1440, height: 796 });

    await page.waitForSelector("#trackingNo");
    await page.click("#trackingNo");
    await page.keyboard.type("38539430031");

    await page.waitForSelector("#goBtn");
    await page.click("#goBtn");

    await navigationPromise;

    await page.waitForSelector(
      ".tabbable-panel-bd > .tabbable-line-bd > .nav > li:nth-child(2) > a"
    );
    await page.click(
      ".tabbable-panel-bd > .tabbable-line-bd > .nav > li:nth-child(2) > a"
    );

    await page.waitForSelector(
      ".table-responsive > .table > tbody > tr:nth-child(1) > td:nth-child(1)"
    );
    await page.click(
      ".table-responsive > .table > tbody > tr:nth-child(1) > td:nth-child(1)"
    );

    await page.waitForSelector(
      "#SCAN38539430031 > div > table > tbody > tr:nth-child(1) > td"
    );

    let elements = await page.$$(
      "#SCAN38539430031 > div > table > tbody > tr:nth-child(1) > td"
    );
    const data = [];
    for (const element of elements) {
      const value = await page.evaluate((el) => el.textContent, element);
      data.push(value.trim());
    }
    res.status(200).json({ status: "ok", data: { success: true, data } });
  } catch (error) {
    res.status(500).json({
      status: "ok",
      data: { success: false, error: error.toString() },
    });
  } finally {
    browser.close();
  }
}
