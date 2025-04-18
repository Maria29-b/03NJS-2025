import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/app_bd");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  }
}
