import Express from "express";
import {
  getReacts,
  isReacted,
  reactPost,
  unreactPost,
} from "../controller/react.js";

const router = Express.Router();

router.get("/getReacts", getReacts);
router.get("/isReacted", isReacted);
router.post("/reactPost", reactPost);
router.post("/unreactPost", unreactPost);

export default router;
