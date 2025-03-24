import { generateToken } from "../lib/util.js";
import User from "../models/user.modal.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !password || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "This email is already registered." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        message: "Signup successful!",
      });
    } else {
      res.status(400).json({ message: "User registration failed. Please try again." });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No account found with this email." });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Incorrect password. Please try again." });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      message: "Login successful!",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "You have been logged out successfully." });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required." });
    }

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // Update user profile picture
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Profile updated successfully!", updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ message: "Failed to update profile. Please try again later." });
  }
};

export const checkAuth = (req, res) =>{
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.error("Error in checkAuth:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
}
