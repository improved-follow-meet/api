import Express from "express";
import {
  getReacts,
  isReacted,
  reactPost,
  unreactPost,
} from "../controller/react.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Express.Router();

router.get("/getReacts", getReacts);
router.get("/isReacted", authenticateToken, isReacted);
router.post("/reactPost", authenticateToken, reactPost);
router.post("/unreactPost", authenticateToken, unreactPost);

export default router;
