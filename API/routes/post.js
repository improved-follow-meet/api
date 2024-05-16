import {
  getPostsUserFollowing,
  addPost,
  getPostsOfUser,
  deletePost,
  getDeletedPosts,
} from "../controller/post.js";
import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/getPosts", authenticateToken, getPostsUserFollowing);
router.post("/addPost", authenticateToken, addPost);
router.get("/getPostsOfUser", getPostsOfUser);
router.post("/deletePost", authenticateToken, deletePost);
router.get("/getDeletedPosts", authenticateToken, getDeletedPosts);

export default router;
