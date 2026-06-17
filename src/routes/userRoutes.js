import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../contorollers/userContoroller.js";
import express from "express";
import protect, { admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", protect, admin, registerUser);
router.post("/login", protect, admin, loginUser);
router.get("/profile", protect, admin, getUserProfile);

export default router;
