import express from 'express';
import registrationValidation from '../validators/registrationValidation.js';
import loginValidation from '../validators/loginValidation.js';
import { registerUser, loginUser } from '../controllers/user.controller.js';
import { forgotPassword, resetPassword } from '../controllers/authentication.controller.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Route for user registration
router.post('/register', registrationValidation, upload.single('avatar'), registerUser);

// Route for user login
router.post('/login', loginValidation, loginUser);

// Route for forgot password
router.post('/forgot-password', forgotPassword);

// Route for reset password
router.post('/reset-password/:token', resetPassword);

export default router;
