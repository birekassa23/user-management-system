// controllers/user.controller.js
// This file contain user registration ,login and avatetrUpload logic;

import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";


// the user registration logic
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

// Middleware for handling avatar upload
export const uploadAvatar = upload.single('avatar');


// Define the storage destination and filename for uploaded files
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/uploads/avatars/"); // Set the destination folder
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname); // Get file extension (e.g., .jpg)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique suffix to avoid name conflicts
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExt); // Final file name: avatar-123456789.jpg
    }
});

// Create the multer upload instance separately
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/; // Allowed file types
        const mimeType = fileTypes.test(file.mimetype); // Check MIME type
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); // Check file extension
        if (mimeType && extname) {
            return cb(null, true); // Accept the file
        }
        cb(new Error("Only image files (jpg, jpeg, png, gif) are allowed"), false); // Reject the file
    }
});

// Export upload instance as default
export default upload;




// user login logic
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