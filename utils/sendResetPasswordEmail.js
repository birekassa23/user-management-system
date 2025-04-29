import nodemailer from 'nodemailer';

// This function sends password reset email
export const sendResetPasswordEmail = async (email, resetToken) => {
    // Create email transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can change to another service if needed
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password or app password
        },
    });

    // Email message options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `Click the link to reset your password:\n\nhttp://localhost:3001/api/users/reset-password/${resetToken}`,
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Reset password email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send reset password email.');
    }
};
