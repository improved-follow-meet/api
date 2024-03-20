import {
  getPostsUserFollowing,
  addPost,
  getPostsOfUser,
  deletePost,
} from "../controller/post.js";
import express from "express";

const router = express.Router();

router.get("/getPosts", getPostsUserFollowing);
router.post("/addPost", addPost);
router.get("/getPostsOfUser", getPostsOfUser);
router.post("/deletePost", deletePost);

export default router;
