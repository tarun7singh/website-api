const controller = require("../controllers/notifications");
const validateToken = require("../utils").validateToken;

module.exports = (router) => {
  router
    .route("/notification/update-token")
    .get(validateToken, controller.updateToken);
};
