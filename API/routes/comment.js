import {
  getComments,
  addComment,
  getNumComments,
  deleteComment,
} from "../controller/comment.js";
import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/getComments", getComments);
router.post("/addComment", authenticateToken, addComment);
router.get("/getNumComments", getNumComments);
router.post("/deleteComment", authenticateToken, deleteComment);

export default router;
