// controllers/user.controller.js

// Import necessary modules and models
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import multer from "multer";
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
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // TODO: Generate and return a JWT token here (for better authentication)

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed!",
            error: error.message
        });
    }
};

/* 
=====================================
 Multer Storage Config for Avatar Upload
=====================================
*/

// Define storage destination and filename for avatars
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/uploads/avatars/"); // Set the upload directory
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname); // Get file extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `avatar-${uniqueSuffix}${fileExt}`); // Example: avatar-23423234.jpg
    }
});

// File filter to allow only specific image types
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
        return cb(null, true); // Accept the file
    }
    cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed"));
};

// Create multer instance for avatar upload
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB size limit
    fileFilter,
});

// Middleware to handle avatar upload
export const uploadAvatar = upload.single('avatar');
