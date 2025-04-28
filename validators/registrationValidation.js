import { body, validationResult } from 'express-validator';

/**
 * Validation middleware for user registration.
 */
const registrationValidation = [
    // Validate 'fullName'
    body('fullName')
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2 }).withMessage('Full name must be at least 2 characters'),

    // Validate 'email'
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Must be a valid email'),

    // Validate 'password'
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    // Validate 'role' (Optional, but if provided, it should be one of the allowed roles)
    body('role')
        .optional()
        .isIn(['admin', 'editor', 'viewer']).withMessage('Role must be one of the following: admin, editor, viewer'),

    // Final middleware to check validation result
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next(); // No validation errors, move to the next middleware/controller
    }
];

export default registrationValidation;
