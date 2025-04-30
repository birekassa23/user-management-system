// utils/sendResetPasswordEmail.js
import nodemailer from 'nodemailer';

export const sendResetPasswordEmail = async (email, resetToken) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST, // smtp.gmail.com
        port: process.env.EMAIL_PORT, // 587
        secure: false, // use TLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `Click the link to reset your password:\n\nhttp://localhost:3000/api/users/reset-password/${resetToken}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Reset password email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send reset password email.');
    }
};
