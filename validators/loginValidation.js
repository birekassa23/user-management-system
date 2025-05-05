
// validators/loginValidation.js

import { body } from 'express-validator';

const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

export default loginValidation;
