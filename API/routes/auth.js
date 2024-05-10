import express from "express";
import { login, register, logout, refresh, test } from "../controller/auth.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", authenticateToken, logout);
router.get("/test", test);
router.post("/refresh", authenticateToken, refresh);

export default router;
