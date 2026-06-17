import express from "express";
import protect from "../middleware/authMiddleware.js";
import { addToCart, getCart, removeFromCart, updateCartQuantity } from "../contorollers/cartContoroller.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/getCart", protect, getCart);
router.delete("/:id", protect, removeFromCart);
router.put("/:id", protect, updateCartQuantity)
export default router;
