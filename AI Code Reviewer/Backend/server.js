import express from "express";
import cors from "cors";
import { config } from "dotenv";
import aiRoutes from "./src/routes/ai.routes.js";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

app.use("/ai", aiRoutes);

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY ? "Loaded" : "Not Found");
});
