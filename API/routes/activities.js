import Express from "express";
import { getLatestActivities } from "../controller/activities.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Express.Router();

router.get("/getLatestActivities", authenticateToken, getLatestActivities);

export default router;
