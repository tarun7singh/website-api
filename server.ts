if (process.env.NODE_ENV === "dev") {
  require("dotenv").config();
}
import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import * as imageController from "./src/controllers/image.controller";
// import * as pnpController from "./controllers/pnp.controller";
// import * as crsController from "./controllers/crs.controller";


// app.get("/pnp-service", pnpController.pnp);
// app.get("/crs-service", crsController.crs);
app.get("/", (req, res) => res.status(200).json({ status: "ok" }));
app.get("/image-generator/get-one", imageController.image);
app.get("/image-generator/image/:name", imageController.getStoredImage);
app.get("/image-generator/approve/:name", imageController.approveStoredImage);
app.get("/image-generator/deny/:name", imageController.deleteStoredImage);
app.post("/image-generator/prepare", imageController.image);
app.listen(5000, () => console.log(`Server started on : http://localhost:${port}`));
process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); })