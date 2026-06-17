import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unicue: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { versionKey: false },
);

const User = mongoose.model("User", userSchema);

export default User;
