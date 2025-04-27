// controllers/user.controller.js

import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, role, avatar } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Create new user
        const user = await User.create({
            fullName,
            email,
            password,
            role,
            avatar,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Registration failed!", error: error.message });
    }
};
