import express from "express";
import { signupUser, verifyOtpController, loginUser } from "../../controllers/admin/authController";

const router = express.Router();

router.post("/signup", signupUser); // Signup route
router.post("/verify-otp", verifyOtpController);

// Login route
router.post("/login", loginUser);

export default router;
