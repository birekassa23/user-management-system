// routes/authRoutes.js

import express from 'express';
import registrationValidation from '../validators/registrationValidation.js'; 
import { registerUser } from '../controllers/user.controller.js'; 
const router = express.Router();

// POST /api/auth/register
router.post('/register', registrationValidation, registerUser);

export default router; 
