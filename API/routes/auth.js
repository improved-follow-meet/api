import express from "express";
import { login, register, logout, test } from "../controller/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/test", test);

export default router;
