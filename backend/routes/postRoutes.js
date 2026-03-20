const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  singlePost,
  getAllPost,
  searchItem,
} = require("../controllers/postControllers.js");
const router = express.Router();

router.post("/post-blogging", createPost);
router.patch("/update-post/:id", updatePost);
router.delete("/delete-post/:id", deletePost);
router.post("/single-post/:id", singlePost);
router.post("/get-all-post", getAllPost);
router.post("/search-item", searchItem);
module.exports = router;
