import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9998;
app.use(
  cors({
    origin: ["http://localhost:5173/"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json("Hello");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connection established");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(`Database connection error: ${err}`));
