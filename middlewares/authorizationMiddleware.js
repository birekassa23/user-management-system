// middlewares/authorizationMiddleware.js

import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

// =====================================
// ✅ Authentication Middleware
// =====================================
// This middleware verifies the JWT token and attaches the logged-in user to req.user.
export const authenticateUser = async (req, res, next) => {
    try {
        // 1. Get token from Authorization header (format: Bearer <token>)
        const token = req.headers.authorization?.split(' ')[1];  // Get token from header

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, token missing' });
        }

        // 2. Verify the token and decode user data
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verifies and decodes the token

        // 3. Find the user by ID from the token (exclude password)
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        // 4. Attach the user object to req.user for further use in controllers
        req.user = user;

        next();  // Pass control to the next middleware or route handler
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// =====================================
// ✅ Authorization Middleware (Role-based)
// =====================================
// This middleware ensures that the user has the appropriate role to access a route.
export const authorizeRole = (...roles) => {
    return (req, res, next) => {
        // 1. Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
        }
        next();  // Proceed to the next middleware or route handler
    };
};
