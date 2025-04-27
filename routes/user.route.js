// routes/user.route.js

import express from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerUser);

export default router;
