import { Request, Response, NextFunction } from "express";
import { prepareImage } from "../service/image.service";
import appRoot from "app-root-path";
import fs from "fs";

export async function image(req: Request, res: Response) {
  try {
    await prepareImage("main");
    res.sendFile("main.jpg", { root: `${appRoot}/images` });
  } catch (error) {
    res.status(500).json({
      status: "ok",
      data: { success: false, error: error.toString() },
    });
  }
}

export async function getStoredImage(req: Request, res: Response) {
  try {
    res.sendFile(`${req.params.name}.jpg`, { root: `${appRoot}/images` });
  } catch (error) {
    res.status(500).json({
      status: "ok",
      data: { success: false, error: error.toString() },
    });
  }
}

export async function approveStoredImage(req: Request, res: Response) {
  try {
    const oldPath = `${appRoot}/images/${req.params.name}.jpg`;
    const newPath = `${appRoot}/approved/${req.params.name}.jpg`;
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      res.status(200).json({ success: true });
    });
  } catch (error) {
    res.status(500).json({
      status: "ok",
      data: { success: false, error: error.toString() },
    });
  }
}

export async function deleteStoredImage(req: Request, res: Response) {
  try {
    const path = `${appRoot}/images/${req.params.name}.jpg`;
    fs.unlink(path, function (err) {
      if (err) throw err;
      res.status(200).json({ success: true });
    });
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
