import { Request, Response } from "express";
import User from "../../models/userModel";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

// ✅ POST - Create user (Signup)
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, confirmPassword, status } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 4);

    const newUser = new User({
      name,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      status: status || "active",
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      phone: savedUser.phone,
      status: savedUser.status,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
};

// ✅ GET - All users with pagination
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 30;
    const skip = (page - 1) * limit;

    const users = await User.find({}, "-password").skip(skip).limit(limit);
    const total = await User.countDocuments();

    res.json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// ✅ GET - User by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error: any) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
};

// ✅ DELETE - User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};

// ✅ PATCH - Update user status
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error: any) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Failed to update user status", error: error.message });
  }
};

// ✅ PATCH - Toggle user status
export const toggleUserStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = user.status === "active" ? "inactive" : "active";
    await user.save();

    res.json({
      message: "User status updated",
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      status: user.status,
    });
  } catch (error: any) {
    console.error("Error toggling user status:", error);
    res.status(500).json({ message: "Failed to toggle user status", error: error.message });
  }
};
