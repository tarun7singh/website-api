const jwt = require("jsonwebtoken");
module.exports = {
  validateToken: (req, res, next) => {
    try {
      const authorizationHeaader = req.headers.authorization;
      let result;
      if (authorizationHeaader) {
        const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
        const options = {
          expiresIn: "7d",
          issuer: "https://api.tarunsingh.dev",
        };
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        req.decoded = result;
        next();
      } else {
        result = {
          error: `Authentication error. Token required.`,
          status: 401,
        };
        res.status(401).send(result);
      }
    } catch (err) {
      result = {
        error: `Authentication error.`,
        status: 401,
      };
      res.status(401).send(result);
    }
  },
};
