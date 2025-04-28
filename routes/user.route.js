// routes/authRoutes.js

import express from 'express';
import registrationValidation from '../validators/registrationValidation.js';
import loginValidation from '../validators/loginValidation.js'; // ✅ Import login validation
import { registerUser, loginUser } from '../controllers/user.controller.js';
import upload from '../middleware/upload.js'; // ✅ Import the correct upload

const router = express.Router();

// POST /api/auth/register
router.post(
    '/register',
    registrationValidation,
    upload.single('avatar'), // ✅ Correct multer usage for single avatar upload
    registerUser
);

// POST /api/auth/login
router.post('/login', loginValidation, loginUser); // ✅ Corrected login route

export default router;
