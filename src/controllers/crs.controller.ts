import { Request, Response, NextFunction } from "express";
import scraper from "../service/crs-scraper";

export async function crs(req: Request, res: Response) {
  try {
    const selector = "tbody > tr > td";
    const url =
      "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html";
    let text = await scraper(url, selector);
    let result = [];
    for (let i = 0; i <= 77; i = i + 7) {
      result.push({
        number: text[i],
        date: text[i + 1],
        category: text[i + 2],
        invites: text[i + 3],
        minScore: text[i + 4],
      });
    }
    res.status(200).json({ status: "ok", data: result });
  } catch (error: any) {
    res.status(500).json({
      status: "ok",
      data: { success: false, error: error.toString() },
    });
  }
}
