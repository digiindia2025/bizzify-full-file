import express from "express";

import { signupUser, verifyOtpController, loginUser, sendOtpHandler, verifyOtpHandler, resetPasswordHandler, googleLoginController, getAllUsers } from "../../controllers/admin/authController";

import { signupUser, verifyOtpController, loginUser } from "../../controllers/admin/authController";


const router = express.Router();

router.post("/signup", signupUser); // Signup route
router.post("/verify-otp", verifyOtpController);

// Login route
router.post("/login", loginUser);


router.post('/send-otp', sendOtpHandler);
router.post('/verify-otp', verifyOtpHandler);
router.post('/reset-password', resetPasswordHandler);
router.post("/google-login", googleLoginController);
router.get('/all', getAllUsers);




export default router;
