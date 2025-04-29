// Import necessary modules and models
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// =====================================
// ✅ Register User
// =====================================
// Registers a new user with name, email, password, optional avatar, and role.
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // If an avatar is uploaded, store the filename
        const avatar = req.file?.filename || null;

        // Create a new user in the database
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role,
            avatar,
        });

        // Respond with success message
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
};

// =====================================
// ✅ Login User
// =====================================
// Logs in a user with email and password, returns a JWT token upon success.
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Compare the entered password with the stored password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Send back the token and user info
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};

// =====================================
// ✅ Get Current Logged-In User
// =====================================
// Returns the profile of the currently logged-in user.
export const getMe = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user // The logged-in user object attached by the authentication middleware
    });
};

// =====================================
// ✅ Update Avatar
// =====================================
// Allows the logged-in user to upload a new avatar.
export const updateAvatar = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        // Ensure the user exists
        if (!user) return res.status(404).json({ message: "User not found" });

        // Ensure an avatar was uploaded
        if (!req.file) return res.status(400).json({ message: "No avatar uploaded" });

        // Delete old avatar if it exists
        if (user.avatar) {
            const oldPath = path.join("uploads", user.avatar);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        // Save the new avatar filename
        user.avatar = req.file.filename;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Avatar updated successfully",
            avatar: user.avatar
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// =====================================
// ✅ Manage Users (Admin Only)
// =====================================
// Allows an admin to manage (view, edit, delete) users.
export const manageUsers = (req, res) => {
    const { id } = req.params;

    // Ensure the user is an admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    // Logic for managing users (view, edit, delete) can be implemented here
    res.status(200).json({
        success: true,
        message: `Admin managing user with ID: ${id}`
    });
};

// =====================================
// ✅ Create/Modify Content (Editor Only)
// =====================================
// Allows an editor to create or modify content.
export const createContent = (req, res) => {
    const content = req.body;

    // Ensure the user is an editor
    if (req.user.role !== 'editor') {
        return res.status(403).json({ message: 'Forbidden: Editors only' });
    }

    // Logic for creating or modifying content
    res.status(200).json({
        success: true,
        message: `Editor creating/editing content: ${content}`
    });
};

// =====================================
// ✅ View Content (All Roles)
// =====================================
// Allows any user (admin, editor, viewer) to view content.
export const viewContent = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Viewing content (accessible by all roles: admin, editor, viewer)'
    });
};
