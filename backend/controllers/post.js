const Post = require("../models/post");

const registerPost = async (req, res) => {
  if (!req.body.text || !req.body.hashtag)
    return res.status(400).send("Incomplete data");

  const post = new Post({
    userId: req.user._id,
    text: req.body.text,
    hashtag: req.body.hashtag,
  });

  const result = await post.save();
  if (!result) return res.status(400).send("Failed to register post");
  return res.status(200).send({ result });
};

const listPost = async (req, res) => {
  const post = await Post.find().populate("userId").exec();
  if (!post || post.length === 0) return res.status(400).send("No posts");
  return res.status(200).send({ post });
};

module.exports = { registerPost, listPost };
