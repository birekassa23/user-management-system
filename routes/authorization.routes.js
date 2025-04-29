import express from 'express';
import { authenticateUser } from '../middlewares/authorizationMiddleware.js';
import { getMe } from '../controllers/user.controller.js';

const router = express.Router();

// Route to get logged-in user's profile
router.get('/me', authenticateUser, getMe);

export default router;
