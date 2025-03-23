import express from "express";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json())

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB()
});
