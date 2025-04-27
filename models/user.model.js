import mongoose, { Schema } from "mongoose";

export const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    avatar: {
        type: String,
        required: true,
    }
});