// import mongoose from "mongoose";

// mongoose

//  .connect("mongodb://localhost:27017/app_bd")
//  .then(() => console.log("Connected"))
//  .catch((err) => console.error("connection error:",
// err));

// connectDB.js
import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/app_bd");
    console.log("Connected");
  } catch (err) {
    console.error("connection error:", err);
  }
}
