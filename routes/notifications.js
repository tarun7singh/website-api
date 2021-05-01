const controller = require("../controllers/notifications");
const validateToken = require("../utils").validateToken;

module.exports = (router) => {
  router
    .route("/notification/update-token")
    .post(validateToken, controller.updateToken);
  router.route("/notification/send").get(controller.sendNotification);
};
