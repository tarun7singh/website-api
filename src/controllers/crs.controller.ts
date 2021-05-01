// import { Request, Response, NextFunction } from "express";
// import { readLast, writeLast, sendThese } from "../utils";
// import scraper from "../scraper";

// export async function crs(req: Request, res: Response) {
//   try {
//     const selector = "tbody";
//     const url =
//       "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html";
//     let text = await scraper(url, selector);
//     // let [text, last] = await Promise.all([textReq, lastReq]);
//     text = text.split("\n");
//     text = text.filter((i: any) => {
//       i = i.trim();
//       return i === "" ? false : true;
//     });
//     let result = [];
//     // for (let item = 0; item < text.length; item = item + 7) {
//     result.push({
//       number: text[0].trim(),
//       date: text[0 + 1].trim(),
//       category: text[0 + 2].trim(),
//       invites: text[0 + 3].trim(),
//       minScore: text[0 + 4].trim(),
//     });
//     // }
//     res.status(200).json({ status: "ok", data: result[0] });
//   } catch (error) {
//     res.status(500).json({
//       status: "ok",
//       data: { success: false, error: error.toString() },
//     });
//   }
// }
