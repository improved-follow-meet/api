import Express from "express";
import { searchPost } from "../controller/search.js";

const router = Express.Router();

router.post("/", searchPost);

export default router;
