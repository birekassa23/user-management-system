// middlewares/authorizationMiddleware.js

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {
    try {
        // 1. Get token from header
        let token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach user to request
        req.user = await User.findById(decoded.id).select('-password'); // do not return password
        next(); // Go to next middleware/route
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};
