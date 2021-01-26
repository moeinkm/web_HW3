const { User, validateAuthentication } = require("./../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const { Errors } = require("./../utils/errors/errors");
const {Normalize} = require('./../utils/normalize');
const router = express.Router();

router.post("/login", async (req, res) => {
  const name = req.body.username.toLowerCase();
  const { error } = validateAuthentication(req.body);
  if (error) return Errors.badRequest(res, error);
  const user = await User.findOne({ username: name });
  if (user === null)
    return Errors.badRequest(res, "Invalid Username or Password");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return Errors.badRequest(res, "Invalid Username or Password");
  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res.send(Normalize.successResponse({token}));
});
module.exports = router;
