import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto"; // To generate OTP
import nodemailer from "nodemailer"; // For sending email
import User from "../../models/authModel";
import jwt from "jsonwebtoken";

// Function to send OTP to the user's email
const sendOTP = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use other email services too
    auth: {
      user: "amankumartiwari5255@gmail.com", // Replace with your email
      pass: "bqbd gioy wnir pqgj", // Replace with your generated App Password
    },
  });

  const mailOptions = {
    from: "amankumartiwari5255@gmail.com",
    to: email,
    subject: "Your OTP for registration",
    text: `Your OTP for registration is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent to email:", email);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

// POST /api/auth/signup
export const signupUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, password, confirmPassword } = req.body;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      status: "pending", // Initially, the user status will be 'pending' until OTP is verified
    });

    const savedUser = await newUser.save();

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    console.log("Generated OTP:", otp);
    console.log("User Email:", normalizedEmail);

    // Save the OTP to the user document (you can also use a separate collection for OTPs)
    savedUser.otp = otp;
    await savedUser.save();

    // Send OTP to the user's email
    await sendOTP(normalizedEmail, otp);

    res.status(201).json({
      message: "User registered successfully. Please check your email for the OTP.",
      user: {
        id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        phone: savedUser.phone,
        status: savedUser.status,
      },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// POST /api/auth/verify-otp
export const verifyOtpController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email and check OTP
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "No OTP found for this email" });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Optional: Check expiry
    const now = new Date();
    if (user.otpExpiry && user.otpExpiry < now) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Update user status to active after OTP verification
    await User.updateOne({ email }, { $set: { status: "active" } });

    // Optionally delete OTP after successful verification
    user.otp = undefined;  // Clear OTP after verification
    user.otpExpiry = undefined;  // Clear OTP expiry
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// POST /api/auth/login

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(200).json({ status: false, message: "User Not Found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        return res.status(200).json({ status: false, message: "Incorrect Password" });
    }

    // Create a JWT token
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES }
    );

    res.status(200).json({ status: true, message: "User Logged In Successfully", token, user });
} catch (error) {
    return res.status(500).json({ status: false, message: error.message });
   }
};
 



// POST /api/auth/forgot-password
export const sendOtpHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // Optional: 10 min expiry
    await user.save();

    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent to email for password reset" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /api/auth/verify-reset-otp
export const verifyOtpHandler = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.otpExpiry && user.otpExpiry < new Date())
      return res.status(400).json({ message: "OTP expired" });

    return res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    console.error("Verify reset OTP error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /api/auth/reset-password
export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  if (!email || !otp || !newPassword || !confirmPassword)
    return res.status(400).json({ message: "All fields are required" });

  if (newPassword !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.otpExpiry && user.otpExpiry < new Date())
      return res.status(400).json({ message: "OTP expired" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
