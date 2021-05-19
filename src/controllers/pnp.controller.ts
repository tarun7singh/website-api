import { Request, Response, NextFunction } from "express";
import scraper from "../service/pnp-scraper";

export async function pnp(req: Request, res: Response) {
  try {
    const selector =
      "#post_master > div:nth-child(1) > div.post_content > ul:nth-child(4) > li";
    const url = "https://moving2canada.com/pnp-canada-live-tracker/";
    let text = await scraper(url, selector);
    text = text.filter((i: any) => {
      return i !== "";
    });
    res.status(200).json({ status: "ok", data: text });
  } catch (error) {
    res.status(500).json({
      status: "ok",
      data: { success: false, error: error.toString() },
    });
  }
}
