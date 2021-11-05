import { Request, Response, NextFunction } from "express";
import { responseTime, sslCheck } from "../service/monitoring.service";

export async function check(req: Request, res: Response) {
  try {
    let { url } = req.query;
    if (!url) {
      res.status(422).json({ status: "ok", data: "url param is required." });
    }
    let urlString: string = (url || "example.com").toString();
    const fullUrl = "https://" + urlString;
    const [pingTime, ssl] = await Promise.all([
      responseTime(fullUrl),
      sslCheck(urlString),
    ]);
    res
      .status(200)
      .json({ status: "ok", data: { responseTime: pingTime, ssl } });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: "ok",
      data: { success: false, error: error.toString() },
    });
  }
}
