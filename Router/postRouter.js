const express = require("express");

const router = express.Router();

const postController = require("../Controller/postController");

router.get("/", postController.getPost);
router.get("/:id", postController.getSinglePost);
router.post("/", postController.createPost);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;