import {
  getComments,
  addComment,
  getNumComments,
  deleteComment,
} from "../controller/comment.js";
import express from "express";

const router = express.Router();

router.get("/getComments", getComments);
router.post("/addComment", addComment);
router.get("/getNumComments", getNumComments);
router.post("/deleteComment", deleteComment);

export default router;
