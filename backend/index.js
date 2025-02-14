import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "https://user-auth-api-eight.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 9998;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
