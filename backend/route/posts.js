const { Post, validatePosts } = require("./../models/Posts");
const { User } = require("./../models/users");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const { Errors } = require("./../utils/errors/errors");
const router = express.Router();
const {Normalize} = require('./../utils/normalize');

router.get("/", auth, async (req, res) => {
  const Posts = await Post.find().sort({"created_date": -1});
  res.send(Posts);
});

router.get("/me", auth, async (req, res) => {
  const Posts = await Post.find({ userID : req.user._id}).sort({"created_date": -1});
  res.send(Posts);
});

router.post("/add", auth, async (req, res) => {
  const user = await  User.findById(req.user._id).select('-password');
  const { error } = validatePosts(req.body);
  if (error) return Errors.badRequest(res, error);
  req.body = Object.assign(req.body, { created_date: Date.now(), userID: user._id ,username: user.username, });
  const post = await Post.findOne({ title: req.body.title });
  if (post) return Errors.badRequest(res, "Post Already Exist.");
  const newPost = new Post(
    _.pick(req.body, ["userID","username","title", "description", "created_date"])
  );

  await newPost.save();
  res.status(201).send(_.pick(newPost, ["_id", "title", "description"]));
});

router.post("/delete", async (req, res) => {
   const post = await Post.findOne({ _id: req.body.id });
   if (post) {
     post.remove();
     res.status(200).send(Normalize.successResponse("",'post deleted successfully'));
   }else{
     res.status(400).send(Normalize.failedResponse('post not exist'));
   }
});

module.exports = router;
