import { Request, Response } from 'express';
import sendEmail from '../../utils/sendEmail';

export const sendCustomEmail = async (req: Request, res: Response) => {
  try {
    const { email, subject, message } = req.body;

    await sendEmail({
      to: email,
      subject,
      text: message,
    });

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
};
