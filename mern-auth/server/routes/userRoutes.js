import express from "express";
import { authUser,registerUser,LogoutUser, getUserProfile, updateUserProfile  } from "../controllers/userController.js";

const router = express.Router();

// Define routes
router.post('/', authUser); // POST /api/users/auth
router.post('/register', registerUser)
router.post('logout', LogoutUser)



export default router;
