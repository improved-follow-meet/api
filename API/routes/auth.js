import express from "express";
import { login, register, logout, refresh, test } from "../controller/auth.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { rateLimiterMiddleware } from "../middleware/ratelimiter.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", rateLimiterMiddleware,  register);
router.post("/logout", authenticateToken, logout);
router.get("/test", test);
router.post("/refresh", authenticateToken, refresh);

export default router;
