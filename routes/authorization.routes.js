// routes/authorization.routes.js

import express from 'express';
import { protect } from '../middlewares/authorizationMiddleware.js'; // Middleware to protect routes
import { getMe } from '../controllers/user.controller.js'; // Controller to get logged-in user info

const router = express.Router(); // Create a router

// Route to get logged-in user's own profile
router.get('/me',
    protect, // Check if user has a valid token
    getMe // Return user info
);

export default router;

