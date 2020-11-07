require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV;

if (environment !== "production") {
  app.use(logger("dev"));
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const routes = require("./routes/index.js");
app.use("/", routes(router));

app.get("/", (req, res, next) => {
  res.json({ status: "ok" });
  next();
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`app listening on port ${process.env.PORT || 5000}!`)
);
