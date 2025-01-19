import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodeMailer.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Please provide all required fields: name, email, and password." });
    }
    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "A user with this email already exists. Please log in or use a different email." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Our Platform!",
            text: `Hello ${name},\n\nYour account has been successfully created using the email: ${email}. Welcome onboard!`,
        };

        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: "Registration successful. A welcome email has been sent to your inbox." });
    } catch (error) {
        res.json({ success: false, message: `Registration failed. Error: ${error.message}` });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Please provide both email and password." });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "No account found with this email. Please register first." });
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.json({ success: false, message: "Incorrect password. Please try again." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, message: "Login successful." });
    } catch (error) {
        return res.json({ success: false, message: `Login failed. Error: ${error.message}` });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return res.json({ success: true, message: "You have been logged out successfully." });
    } catch (error) {
        return res.json({ success: false, message: `Logout failed. Error: ${error.message}` });
    }
};

export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Your account is already verified." });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your OTP is ${otp}. Use this to verify your account within 24 hours.`,
        };

        await transporter.sendMail(mailOption);

        res.json({ success: true, message: "A verification OTP has been sent to your email." });
    } catch (error) {
        return res.json({ success: false, message: `Failed to send verification OTP. Error: ${error.message}` });
    }
};

export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: "Please provide both user ID and OTP." });
    }

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        if (user.verifyOtp !== otp) {
            return res.json({ success: false, message: "The OTP you provided is incorrect." });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "The OTP has expired. Please request a new one." });
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({ success: true, message: "Your email has been verified successfully." });
    } catch (error) {
        return res.json({ success: false, message: `Email verification failed. Error: ${error.message}` });
    }
};

export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true, message: "User is authenticated." });
    } catch (error) {
        res.json({ success: false, message: `Authentication check failed. Error: ${error.message}` });
    }
};


export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Please provide your email address." });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "No account found with this email." });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP is ${otp}. Use this to reset your password within 15 minutes.`,
        };

        await transporter.sendMail(mailOption);

        return res.json({ success: true, message: "Password reset OTP has been sent to your email." });
    } catch (error) {
        return res.json({ success: false, message: `Failed to send password reset OTP. Error: ${error.message}` });
    }
};

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Please provide all required fields: email, OTP, and new password." });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "No account found with this email." });
        }

        if (user.resetOtp !== otp) {
            return res.json({ success: false, message: "The OTP you provided is incorrect." });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "The OTP has expired. Please request a new one." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: "Your password has been reset successfully." });
    } catch (error) {
        return res.json({ success: false, message: `Password reset failed. Error: ${error.message}` });
    }
};
