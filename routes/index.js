const users = require("./users");
const notifications = require("./notifications");

module.exports = (router) => {
  users(router);
  notifications(router);
  return router;
};
