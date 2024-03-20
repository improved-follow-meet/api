import {
  getUserInfos,
  getUserIdByUsername,
  suggestUser,
  getUsernameById,
  updateInfo,
  updatePFP,
  updateCover,
} from "../controller/user.js";
import express from "express";

const router = express.Router();

router.get("/getUserInfos", getUserInfos);
router.get("/getUserIdByUsername", getUserIdByUsername);
router.get("/suggestUser", suggestUser);
router.get("/getUsernameById", getUsernameById);
router.post("/updateInfo", updateInfo);
router.post("/updatePFP", updatePFP);
router.post("/updateCover", updateCover);

export default router;
