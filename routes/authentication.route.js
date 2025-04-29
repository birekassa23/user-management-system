// routes/authentication.route.js

import express from 'express';
import registrationValidation from '../validators/registrationValidation.js'; // Validate registration data
import loginValidation from '../validators/loginValidation.js'; // Validate login data
import { registerUser, loginUser } from '../controllers/user.controller.js'; // Controller functions
import upload from '../middlewares/upload.js'; // Middleware to handle avatar uploads

const router = express.Router(); // Create a router

// Register a new user
router.post(
    '/register',
    registrationValidation, // Validate input (name, email, password, etc.)
    upload.single('avatar'), // Handle avatar upload (only one file)
    registerUser // Controller to register the user
);

// Login a user
router.post(
    '/login',
    loginValidation, // Validate input (email and password)
    loginUser // Controller to login the user
);

export default router; // Export router to use in app.js
