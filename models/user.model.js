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
        // Added fields for forgot password functionality
        resetToken: { // Temporary token for password reset
            type: String,
        },
        resetTokenExpiration: { // Expiration time for the reset token
            type: Date,
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt
);

// Export User model
export const User = mongoose.model("User", userSchema);
