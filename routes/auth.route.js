// routes/user.route.js
// routes/authRoutes.js

import express from 'express';
import registrationValidation from '../validators/registrationValidation.js';
import loginValidation from '../validators/loginValidation.js';
import { registerUser, loginUser } from '../controllers/user.controller.js';
import upload from '../middlewares/upload.js'; 

const router = express.Router();

// POST /api/auth/register
router.post(
    '/register',
    registrationValidation,
    upload.single('avatar'),
    registerUser
);

// POST /api/auth/login
router.post('/login',
    loginValidation,
    loginUser
);

export default router;
