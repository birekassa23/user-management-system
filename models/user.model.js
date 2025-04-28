// models/user.model.js
import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 50,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'editor', 'viewer'], // Correct enum validation
        },
        avatar: {
            type: String, // URL or file path of the uploaded avatar
            default: "assets/images/default.png", // Default avatar if none is uploaded
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt
);

// Export User model
export const User = mongoose.model("User", userSchema);
