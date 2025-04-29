import express from 'express';
import { protect } from '../middlewares/authorizationMiddleware.js';
import { getMe } from '../controllers/user.controller.js';

const router = express.Router();

// Private route, must have token
router.get('/me', protect, getMe);

export default router;
