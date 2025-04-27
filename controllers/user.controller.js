// controllers/user.controller.js

import { User } from "../models/user.model.js";

// Controller function for user registration
export const registerUser = async (req, res) => {
    try {
        const { full_name, email, password, avatar } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Create new user
        const user = await User.create({
            full_name,
            email,
            password,
            avatar,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
