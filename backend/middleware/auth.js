const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) res.status(401).send("Access denied. No Token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send("invalid token");
  }
};
