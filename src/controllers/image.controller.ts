import { Request, Response, NextFunction } from "express";
import { prepareImage, prepareImages } from "../service/image.service";
import appRoot from "app-root-path";
import fs from "fs";
import axios from "axios";

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

export async function prepare(req: Request, res: Response) {
  try {
    await prepareImages(5);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      status: "ok",
      data: { success: false, error: error.toString() },
    });
  }
}

export async function slackHandler(req: Request, res: Response) {
  try {
    const payload = JSON.parse(req.body.payload);
    const [action, name] = payload.actions[0].value.split(" - ");
    const { response_url } = payload;
    if (action === "approve") {
      const oldPath = `${appRoot}/images/${name}.jpg`;
      const newPath = `${appRoot}/approved/${name}.jpg`;
      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
        axios.post(response_url, {
          replace_original: "true",
          text: `Thanks for your response, Approved - ${name}.jpg`,
        });
      });
    } else {
      const path = `${appRoot}/images/${name}.jpg`;
      fs.unlink(path, function (err) {
        if (err) throw err;
        axios.post(response_url, {
          replace_original: "true",
          text: `Thanks for your response, Deleted - ${name}.jpg`,
        });
      });
    }
    res.status(200).json({ success: true });
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
