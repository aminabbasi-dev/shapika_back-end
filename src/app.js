import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"
import protect from "./middleware/authMiddleware.js";
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config({ path: "../.env" });
await connectDB();
const app = express();
app.use(express.json());
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users",userRoutes)
app.use("/cart", protect, cartRoutes)
app.use("/orders", protect, orderRoutes)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
