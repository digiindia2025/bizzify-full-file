import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library'; // Google OAuth2 client for token verification
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Google OAuth2 client initialization
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Standard login function
export const loginUser = async (req: Request, res: Response) => {
  const { email, password, tokenId } = req.body;

  // If tokenId is provided, proceed with Google login
  if (tokenId) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        return res.status(400).json({ message: 'Invalid Google token' });
      }

      // Find or create the user based on the payload data (email, name, picture, etc.)
      const user = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      };

      // For simplicity, you could replace this with a real database check/insert
      // Example: const userInDb = await UserModel.findOne({ email: payload.email });
      
      // Generate JWT token for the user (you can customize this further)
      const jwtToken = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      // Send response with the token
      return res.status(200).json({ message: 'Google login successful', user, token: jwtToken });
    } catch (error) {
      console.error('Error verifying Google token:', error);
      return res.status(400).json({ message: 'Google login failed' });
    }
  }

  // If tokenId is not provided, proceed with standard email/password login
  // (Replace this with actual user authentication logic)
  if (email === 'test@example.com' && password === 'password123') {
    // Generate JWT token for standard login (you can customize this further)
    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token: jwtToken });
  }

  // Invalid credentials for email/password login
  return res.status(400).json({ message: 'Invalid credentials' });
};
