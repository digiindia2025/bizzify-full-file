import { Request, Response } from "express";
import User from "../../models/userModel";

// GET all users with status "Deactivated"
export const getDeactivatedUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ status: "Deactivated" });

    if (!users.length) {
      return res.status(404).json({ message: "No deactivated users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching deactivated users:", error);
    return res.status(500).json({ message: "Failed to fetch deactivated users" });
  }
};

// CREATE a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, status } = req.body;

    // Basic validation
    if (!name || !email || !phone || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    const newUser = await User.create({ name, email, phone, status });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};

// DELETE a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne(); // cleaner than findByIdAndDelete when you already have the doc
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Failed to delete user" });
  }
};
