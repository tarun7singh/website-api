const User = require("../models/users");
const dbConnect = require("../db").dbConnect;
const { Expo } = require("expo-server-sdk");
const axios = require("axios");

module.exports = {
  updateToken: async (req, res) => {
    try {
      const { name, notificationToken } = req.body;
      if (req.decoded.user !== name) {
        res.status(403).json({
          error: `Not Authorized to edit.`,
          status: 403,
        });
      }
      let result = {};
      let status = 200;
      await dbConnect();
      await User.findOneAndUpdate({ name }, { notificationToken }).exec();
      res.status(status).send({ message: "Success" });
      return;
    } catch (err) {
      res.status(500).send({ status: 500, error: err });
    }
  },
  sendNotification: async (req, res) => {
    try {
      const { name, title, body, token } = req.body;
      if (token !== process.env.NOTIF_AUTH) {
        res
          .status(422)
          .send({ status: 422, error: "token param is required." });
        return;
      }
      await dbConnect();
      let { notificationToken = "" } = await User.findOne({ name }).exec();
      if (!Expo.isExpoPushToken(notificationToken)) {
        res
          .status(400)
          .send({ status: 400, error: "no token exists for this user." });
        return;
      }
      let message = {
        to: notificationToken,
        sound: "default",
        title,
        body,
        data: { withSome: "data" },
      };
      const resp = await axios.post(
        "https://exp.host/--/api/v2/push/send",
        message
      );
      res.status(200).send({ message: "Success" });
    } catch (err) {
      res.status(500).send({ status: 500, error: err });
    }
  },
};
