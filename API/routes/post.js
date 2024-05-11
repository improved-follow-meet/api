import {
  getPostsUserFollowing,
  addPost,
  getPostsOfUser,
  deletePost,
} from "../controller/post.js";
import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/getPosts", authenticateToken, getPostsUserFollowing);
router.put("/addPost", authenticateToken, addPost);
router.get("/getPostsOfUser", getPostsOfUser);
router.post("/deletePost", authenticateToken, deletePost);

export default router;
