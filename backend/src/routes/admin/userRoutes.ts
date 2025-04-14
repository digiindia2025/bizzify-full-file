import express from "express";
import {
//   loginUser,
//   forgotPassword,
//   resetPassword,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserStatus,
  createUser,
  toggleUserStatus,
  
} from "../../controllers/admin/userController";

// import { body } from "express-validator";
// import User from "../../models/User";

const router = express.Router();

// ✅ POST user login
// router.post("/users/login", loginUser);

// ✅ POST forgot password
// router.post("/forgot-password", forgotPassword);

// ✅ POST reset password
// router.post("/users/reset-password/:token", resetPassword);

// ✅ GET all users
router.get("/users", getAllUsers);

// ✅ GET user by ID
router.get("/users/:id", getUserById);

// ✅ DELETE user
router.delete("/users/:id", deleteUser);

// ✅ PATCH update user status
router.patch("/users/:id/status", updateUserStatus);

// ✅ POST create user (admin creates a user)
router.post("/users/signup", createUser);

// ✅ PATCH toggle user active/inactive status
router.patch("/users/:id/toggle-status", toggleUserStatus);

// ✅ POST user registration (without validation)
router.post(
  "/users",
  // [
  //   body("fullName").not().isEmpty().withMessage("Full Name is required."),
  //   body("email")
  //     .isEmail()
  //     .withMessage("Please provide a valid email address.")
  //     .custom(async (email) => {
  //       const existingUser = await User.findOne({ email });
  //       if (existingUser) {
  //         throw new Error("Email is already in use.");
  //       }
  //       return true;
  //     }),
  //   body("phone")
  //     .matches(/^\d{10}$/)
  //     .withMessage("Phone number must be 10 digits."),
  //   body("password")
  //     .isLength({ min: 8 })
  //     .withMessage("Password must be at least 8 characters.")
  //     .matches(/[A-Z]/)
  //     .withMessage("Password must contain at least one uppercase letter.")
  //     .matches(/[0-9]/)
  //     .withMessage("Password must contain at least one number.")
  //     .matches(/[\W_]/)
  //     .withMessage("Password must contain at least one special character."),
  //   body("confirmPassword").custom((confirmPassword, { req }) => {
  //     if (confirmPassword !== req.body.password) {
  //       throw new Error("Passwords do not match.");
  //     }
  //     return true;
  //   }),
  // ],
  createUser
);

export default router;
