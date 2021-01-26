const {
  User,
  validateUser,
} = require("./../models/users");
const {Normalize} = require('./../utils/normalize');
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const { Errors } = require("./../utils/errors/errors");
const router = express.Router();

router.get("/list", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post("/create", async (req, res) => {
  const name = req.body.username.toLowerCase();
  delete req.body.repeat;
  const { error } = validateUser(req.body);
  if (error) return Errors.badRequest(res, error);
  const user = await User.findOne({ email: req.body.email });
  if (user) return Errors.badRequest(res, "User Already Registered.");
  const username = await User.findOne({ username: name });
  if (username)
    return Errors.badRequest(res, "This Username Already Registered.");
  const newUser = new User({
    username: name,
    password: req.body.password,
    email: req.body.email,
  });
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  const new_user = await newUser.save();
  const token =new_user.generateAuthToken();
  res.status(201).send(Normalize.successResponse({token}));
});

module.exports = router;
