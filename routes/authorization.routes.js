// routes/authorization.routes.js
import express from 'express';
import { authenticateUser, authorizeRole } from '../middlewares/authorizationMiddleware.js';
import { getMe, manageUsers, createContent, viewContent } from '../controllers/user.controller.js';

const router = express.Router();

// Get logged-in user's profile (only authenticated)
router.get('/me', authenticateUser, getMe);

// Admin routes: Only admin can manage users
router.get('/users', authenticateUser, authorizeRole('admin'), manageUsers);
router.put('/users/:id', authenticateUser, authorizeRole('admin'), manageUsers);
router.delete('/users/:id', authenticateUser, authorizeRole('admin'), manageUsers);

// Editor routes: Editors can add/edit content
router.post('/content', authenticateUser, authorizeRole('editor'), createContent);
router.put('/content/:id', authenticateUser, authorizeRole('editor'), createContent);

// Viewer route: Viewers can only view content
router.get('/content', authenticateUser, authorizeRole('viewer', 'editor', 'admin'), viewContent);

export default router;
