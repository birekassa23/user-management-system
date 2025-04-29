// controllers/user.controller.js

// Import necessary modules and models
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";


/* 
=====================================
 User Registration Controller
=====================================
*/
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, role, avatar } = req.body;

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user record
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role,
            avatar, // optional, if using avatar upload
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Registration failed!",
            error: error.message
        });
    }
};


/* 
=====================================
 User Login Controller
=====================================
*/
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 2. Validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3. Generate a JWT token
        const token = jwt.sign(
            {
                id: user._id,    // Save user ID inside token
                role: user.role  // Save user role inside token
            },
            process.env.JWT_SECRET, // Secret key from .env file
            { expiresIn: '7d' }      // Token expires after 7 days
        );

        // 4. Send token and user info to frontend
        res.status(200).json({
            success: true,
            message: "Login successful",
            token, // Sending token
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed!",
            error: error.message
        });
    }
};


export const getMe = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
};


// =======================================
// ✅ Update Avatar Controller
// =======================================
export const updateAvatar = async (req, res) => {
    try {
        const userId = req.user._id;                     // Get logged-in user ID from middleware
        const user = await User.findById(userId);        // Find user from DB

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No avatar uploaded" });
        }

        // ✅ Delete old avatar if it exists
        if (user.avatar) {
            const oldPath = path.join("uploads", user.avatar); // Build path to old avatar
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath); // Delete the old file
            }
        }

        // ✅ Save the new avatar filename to user profile
        user.avatar = req.file.filename;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Avatar updated successfully",
            avatar: user.avatar
        });

    } catch (error) {
        console.error("Error updating avatar:", error);
        res.status(500).json({ message: "Server error" });
    }
};
