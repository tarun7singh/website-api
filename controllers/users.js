const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConnect = require("../db").dbConnect;

module.exports = {
  logged: (req, res) => {
    return res.json({ message: "you're logged in" });
  },
  add: async (req, res) => {
    let result = {};
    let status = 201;
    await dbConnect().catch((err) => {
      res.status(500).send({ status: 500, error: err });
    });
    const { name, password } = req.body;
    const user = new User({ name, password });
    user.save((err, user) => {
      if (!err) {
        result.status = status;
        result.result = user;
      } else {
        status = 500;
        result.status = status;
        result.error = err;
      }
      res.status(status).send(result);
    });
  },
  login: async (req, res) => {
    try {
      const { name, password } = req.body;
      await dbConnect();
      let result = {};
      let status = 200;
      let user = await User.findOne({ name, active: true }).exec();
      if (!user) {
        status = 401;
        result.status = status;
        result.error = "Authentication error";
        res.status(status).send(result);
      }
      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          const payload = { user: user.name };
          const options = {
            expiresIn: "7d",
            issuer: "https://api.tarunsingh.dev",
          };
          const secret = process.env.JWT_SECRET;
          const token = jwt.sign(payload, secret, options);

          result.token = token;
          result.status = status;
        } else {
          status = 401;
          result.status = status;
          result.error = "Authentication error";
        }
        res.status(status).send(result);
      });
    } catch (err) {
      res.status(500).send({ status: 500, error: err });
    }
  },
  validUsername: async (req, res) => {
    const { name } = req.body;
    try {
      await dbConnect();
      const user = await User.findOne({ name }).exec();
      if (user === null) {
        res.json({ valid: true });
      } else {
        res.json({ valid: false });
      }
    } catch (err) {
      res.status(500).send({ status: 500, error: err });
    }
  },
};
