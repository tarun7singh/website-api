require("dotenv").config();
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

const port = process.env.PORT || 5000;
import * as imageController from "./src/controllers/image.controller";
import * as pnpController from "./src/controllers/pnp.controller";
import * as puppyController from "./src/controllers/puppy.controller";
import * as crsController from "./src/controllers/crs.controller";
import * as monitoringController from "./src/controllers/monitoring.controller";

app.get("/crs-service", crsController.crs);
app.get("/pnp-service", pnpController.pnp);
app.get("/puppy", puppyController.puppy);

app.get("/monitoring", monitoringController.check);

app.all("/image-generator", imageController.slackHandler);

app.get("/image-generator/get-one", imageController.image);
app.get("/image-generator/image/:name", imageController.getStoredImage);

app.all("/image-generator/prepare", imageController.prepare);

app.get("/", (req, res) => res.status(200).json({ status: "ok" }));

app.listen(5000, () =>
  console.log(`Server started on : http://localhost:${port}`)
);
process.on("SIGINT", () => {
  console.log("Bye bye!");
  process.exit();
});
