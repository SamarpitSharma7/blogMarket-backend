const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// GET all comments
router.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a comment by admin
router.delete("/comments/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json("Comment has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE USER BY ADMIN
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res.status(200).json("User has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USERS
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    const userInfos = users.map((user) => {
      const { _id, username, email } = user._doc;
      return { _id, username, email };
    });
    res.status(200).json(userInfos);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST DETAILS
router.get("/blogs", async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POSTS
router.delete("/blogs/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json("Post has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
