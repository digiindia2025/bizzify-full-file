"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controllers/admin/userController");
// import { body } from "express-validator";
// import User from "../../models/User";
const router = express_1.default.Router();
// ✅ POST user login
// router.post("/users/login", loginUser);
// ✅ POST forgot password
// router.post("/forgot-password", forgotPassword);
// ✅ POST reset password
// router.post("/users/reset-password/:token", resetPassword);
// ✅ GET all users
router.get("/users", userController_1.getAllUsers);
// ✅ GET user by ID
router.get("/users/:id", userController_1.getUserById);
// ✅ DELETE user
router.delete("/users/:id", userController_1.deleteUser);
// ✅ PATCH update user status
router.patch("/users/:id/status", userController_1.updateUserStatus);
// ✅ POST create user (admin creates a user)
router.post("/users/signup", userController_1.createUser);
// ✅ PATCH toggle user active/inactive status
router.patch("/users/:id/toggle-status", userController_1.toggleUserStatus);
// ✅ POST user registration (without validation)
router.post("/users", 
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
userController_1.createUser);
exports.default = router;
