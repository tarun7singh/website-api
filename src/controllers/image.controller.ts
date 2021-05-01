import { Request, Response, NextFunction } from "express";
import { prepareImage } from "../service/image.service";

export async function image(req: Request, res: Response) {
  try {
    await prepareImage("main");
    res.sendFile("main.jpg", { root: "src/images" });
  } catch (error) {
    res.status(500).json({
      status: "ok",
      data: { success: false, error: error.toString() },
    });
  }
}
export async function prepare(req: Request, res: Response) {
  try {
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({
      status: "ok",
      data: { success: false, error: error.toString() },
    });
  }
}
