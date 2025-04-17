import { Schema, model } from "mongoose";

const unserSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: String,
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
