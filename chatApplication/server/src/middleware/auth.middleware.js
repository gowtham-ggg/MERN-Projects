import jwt from "jsonwebtoken";
import User from "../models/user.modal.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token. Please log in again." });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in authentication:", error.message);
    res.status(500).json({ message: "Authentication failed. Please try again later." });
  }
};
