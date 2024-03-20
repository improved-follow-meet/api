import Express from "express";
import { getLatestActivities } from "../controller/activities.js";

const router = Express.Router();

router.get("/getLatestActivities", getLatestActivities);

export default router;
