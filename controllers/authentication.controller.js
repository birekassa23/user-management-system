import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendResetPasswordEmail } from '../utils/sendResetPasswordEmail.js';

// Controller for Forgot Password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Create a random reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Save token and expiration to user
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // Token expires after 1 hour
        await user.save();

        // Send reset email
        await sendResetPasswordEmail(email, resetToken);

        res.status(200).json({ message: 'Reset password link sent to your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Controller for Reset Password
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Find user by token and check if token is still valid
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }, // Check if token is not expired
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password and clear reset token
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};
