import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.js" ;


dotenv.config(); 
connectDB(); 
const app = express();
const PORT = 3000;


app.use(express.json()); 

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
  });
  
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
