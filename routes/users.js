const controller = require("../controllers/users");
const validateToken = require("../utils").validateToken;

module.exports = (router) => {
  router.route("/logged-user").get(validateToken, controller.logged);
  router.route("/register").post(controller.add);
  router.route("/login").post(controller.login);
  router.route("/username-valid").get(controller.validUsername);
};
