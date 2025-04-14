import { Request, Response } from 'express';
import User from '../../models/userModel';
import crypto from 'crypto';
import sendEmail from '../../utils/sendEmail'; // Adjust path if needed

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const otp = crypto.randomInt(100000, 999999).toString();
    user.resetToken = otp;
    user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset OTP',
        text: `Your OTP is ${otp}. It will expire in 15 minutes.`,
      });

      res.status(200).json({ message: 'OTP sent to email.' });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      res.status(500).json({ message: 'Error sending email' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
