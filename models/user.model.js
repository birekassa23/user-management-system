// models/user.model.js

import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, "Full name is required"],
        minlength: [6, "Full name must be at least 6 characters"],
        maxlength: [50, "Full name must not exceed 50 characters"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    avatar: {
        type: String, // URL or file path of the uploaded avatar
        default: "",  // Optional avatar
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt

// Export User model
export const User = mongoose.model("User", userSchema);
