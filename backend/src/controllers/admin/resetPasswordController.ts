import { Request, Response } from "express";
import User from "../../models/userModel";
import bcrypt from "bcrypt";

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({ message: "Both password fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Find user with matching resetToken and check if it hasn't expired
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }, // still valid
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Clear the reset token fields
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error: any) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Failed to reset password", error: error.message });
  }
};
