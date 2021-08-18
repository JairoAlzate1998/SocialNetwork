const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post");

router.post("/registerPost", PostController.registerPost);
router.get("/listPost", PostController.listPost);

module.exports = router;