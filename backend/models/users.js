const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 4,
    maxlength: 50,
  },
  email: {
    type: String,
    minlength: 4,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);
function validateUserInformation(user) {
  const schema = {
    username: Joi.string().min(4).max(50).required(),
    email: Joi.ma().required().email(),
    password: Joi.string().min(5).max(20).required(),
  };
  return Joi.validate(user, schema);
}

function validateAuthentication(user) {
  const schema = {
    username: Joi.string().min(4).max(50),
    password: Joi.string().min(4).max(1050),
  };
  return Joi.validate(user, schema);
}

function validateNewUser(user) {
  const schema = {
    username: Joi.string().min(4).max(50),
    password: Joi.string().min(4).max(1050),
    email: Joi.string().required().email(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateInformation = validateUserInformation;
exports.validateUser = validateNewUser;
exports.validateAuthentication = validateAuthentication;
