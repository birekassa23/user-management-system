import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, role, avatar } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);  // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt);  // Hash the password

        // Create new user with the hashed password
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,  // Save the hashed password
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



export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the entered password with the hashed one stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // If passwords match, proceed with login (e.g., generate JWT token)
        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Login failed!", error: error.message });
    }
};
