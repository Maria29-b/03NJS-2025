import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,  
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  creates_at: {
    type: Date,
    default: Date.now,
  },
});

export const User = model("User", userSchema);
