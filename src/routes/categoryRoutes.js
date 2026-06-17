import {
  createCategory,
  getCategories,
} from "../contorollers/categoryContoroller.js";
import express from "express";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);

export default router;
