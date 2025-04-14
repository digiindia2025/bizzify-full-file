import express from "express";
import {
  getDeactivatedUsers,
  createUser,
  deleteUser,
} from "../../controllers/admin/deactivateUserController";

const router = express.Router();

// Get all deactivated users
router.get("/users/deactivated", getDeactivatedUsers);

// Create a new user
router.post("/users", createUser);

// Delete user by ID
router.delete("/users/:id", deleteUser);

export default router;
