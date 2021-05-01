// import { Request, Response, NextFunction } from "express";
// import { readLast, writeLast, sendThese } from "../utils";
// import scraper from "../scraper";

// export async function pnp(req: Request, res: Response) {
//   try {
//     const selector =
//       "#post_master > div:nth-child(1) > div.post_content.post_content_side_height.left > div:nth-child(4) > ul";
//     const url = "https://moving2canada.com/pnp-canada-live-tracker/";
//     const textReq = scraper(url, selector);
//     const lastReq = readLast();
//     let [text, last] = await Promise.all([textReq, lastReq]);
//     text = text.split("\n");
//     text = text.filter((i: any) => {
//       return i === "" ? false : true;
//     });
//     let data;
//     if (last.data && last.data.data === text[text.length - 1]) {
//       data = { success: true, newUpdates: false };
//     } else {
//       let s = sendThese([text[text.length - 1]]);
//       let w = writeLast(text[text.length - 1]);
//       await Promise.all([s, w]);
//       data = { success: true, newUpdates: true };
//     }
//     res.status(200).json({ status: "ok", data });
//   } catch (error) {
//     res.status(500).json({
//       status: "ok",
//       data: { success: false, error: error.toString() },
//     });
//   }
// }
