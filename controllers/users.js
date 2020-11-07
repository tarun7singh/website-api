const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {
  logged: (req, res) => {
    return res.json({ message: "you're logged in" });
  },
  add: (req, res) => {
    mongoose.connect(
      connUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        let result = {};
        let status = 201;
        if (!err) {
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
        } else {
          status = 500;
          result.status = status;
          result.error = err;
          res.status(status).send(result);
        }
      }
    );
  },
  login: (req, res) => {
    const { name, password } = req.body;

    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      let result = {};
      let status = 200;
      if (!err) {
        User.findOne({ name }, (err, user) => {
          if (!err && user) {
            bcrypt
              .compare(password, user.password)
              .then((match) => {
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
              })
              .catch((err) => {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
              });
          } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },
  validUsername: (req, res) => {
    const { name } = req.body;
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      let result = {};
      let status = 200;
      if (!err) {
        User.findOne({ name }, (err, user) => {
          if (err) {
            res.status(500);
            return;
          }
          if (user === null) {
            res.json({ valid: true });
          } else {
            res.json({ valid: false });
          }
        });
      } else {
        res.status(500);
      }
    });
  },
};
