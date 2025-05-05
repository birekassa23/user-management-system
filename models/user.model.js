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
            enum: ['admin', 'editor', 'viewer'], 
        },
        avatar: {
            type: String,
            default: "assets/images/default.png", 
        },
        resetToken: {
            type: String,
        },
        resetTokenExpiration: {
            type: Date,
        },
    },
    { timestamps: true }
);


export const User = mongoose.model("User", userSchema);
