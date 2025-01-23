import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 8000;

// Connect database
connectDB();

// Middleware
const allowedOrigins = ['http://localhost:3000'];

app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true })); 
app.use(cookieParser());

// API end points
app.get('/', (req, res) => {
  res.send("API WORKING");
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`Server started on the port: ${port}`);
});
