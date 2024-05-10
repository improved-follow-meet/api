import Express from "express";
import {
  followUser,
  getFollowers,
  getOnlineFollowings,
  isFollowed,
  unfollowUser,
} from "../controller/follow.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Express.Router();

router.get("/isFollowed", authenticateToken, isFollowed);
router.post("/followUser", authenticateToken, followUser);
router.post("/unfollowUser", authenticateToken, unfollowUser);
router.get("/getFollowers", authenticateToken, getFollowers);
router.get("/getOnlineFollowings", authenticateToken, getOnlineFollowings);

export default router;
