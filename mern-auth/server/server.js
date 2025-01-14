import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(notFound)
app.use(errorHandler)

// Routes
app.use('/api/users', userRoutes); // Mount the user routes

app.get('/', (req, res) => res.send('Server is live 🥳'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
