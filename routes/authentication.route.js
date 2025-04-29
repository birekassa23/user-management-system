// routes/authentication.route.js
import express from 'express';
import registrationValidation from '../validators/registrationValidation.js';
import loginValidation from '../validators/loginValidation.js';
import { registerUser, loginUser, updateAvatar } from '../controllers/user.controller.js';
import { forgotPassword, resetPassword } from '../controllers/authentication.controller.js';
import upload from '../middlewares/upload.js';
import { authenticateUser } from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

// =====================================
// ✅ Auth Routes
// =====================================

// Register a new user (with optional avatar upload)
router.post('/register', registrationValidation, upload.single('avatar'), registerUser);

// Login user
router.post('/login', loginValidation, loginUser);

// Send password reset link
router.post('/forgot-password', forgotPassword);

// Reset password with token
router.post('/reset-password/:token', resetPassword);

// Update avatar (protected route)
router.put('/update-avatar', authenticateUser, upload.single('avatar'), updateAvatar);

export default router;
