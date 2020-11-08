const User = require("../models/users");
const dbConnect = require("../db").dbConnect;

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
      await dbConnect().catch((err) => {
        res.status(500).send({ status: 500, error: err });
        return;
      });
      let user = await User.findOneAndUpdate(
        { name },
        { notificationToken }
      ).exec();
      res.status(status).send({ message: "Success" });
      return;
    } catch (err) {
      res.status(500).send({ status: 500, error: err });
    }
  },
};
