import Express from "express";
import {
  followUser,
  getFollowers,
  getOnlineFollowings,
  isFollowed,
  unfollowUser,
} from "../controller/follow.js";

const router = Express.Router();

router.get("/isFollowed", isFollowed);
router.post("/followUser", followUser);
router.post("/unfollowUser", unfollowUser);
router.get("/getFollowers", getFollowers);
router.get("/getOnlineFollowings", getOnlineFollowings);

export default router;
