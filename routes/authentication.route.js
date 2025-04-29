import express from 'express';
import registrationValidation from '../validators/registrationValidation.js';
import loginValidation from '../validators/loginValidation.js';
import { registerUser, loginUser, updateAvatar } from '../controllers/user.controller.js';
import { forgotPassword, resetPassword } from '../controllers/authentication.controller.js';
import upload from '../middlewares/upload.js';
import { authenticateUser } from '../middlewares/authorizationMiddleware.js'; // ✅ Add this

const router = express.Router();

// ✅ Registration route
router.post('/register', registrationValidation, upload.single('avatar'), registerUser);

// ✅ Login route
router.post('/login', loginValidation, loginUser);

// ✅ Forgot password
router.post('/forgot-password', forgotPassword);

// ✅ Reset password
router.post('/reset-password/:token', resetPassword);

// ✅ Update avatar route (requires authentication)
router.put('/update-avatar', authenticateUser, upload.single('avatar'), updateAvatar);

export default router;
