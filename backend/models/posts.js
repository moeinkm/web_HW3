const Joi = require("joi");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  }, username: {
    type: String,
    required: true,
  },
    title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
  },
  description: {
    type: String,
    required: false,
    maxlength: 500,
  },
  created_date: {
    type: String,
    required: true,
  },
});
const Post = mongoose.model("Post", postSchema);
function validatePosts(post) {
  const schema = {
    title: Joi.string().min(4).max(50).required(),
    description: Joi.string().max(500).required(),
  };
  return Joi.validate(post, schema);
}

exports.Post = Post;
exports.validatePosts = validatePosts;
