// src/routes/admin/forgotPasswordRoutes.ts

import express from 'express';
import { forgotPassword } from '../../controllers/admin/forgotPasswordController'; // ✅ Path correct hona chahiye

const router = express.Router();

router.post('/forgot-password', forgotPassword); // ✅ forgotPassword must not be undefined

export default router;
