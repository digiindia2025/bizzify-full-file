import express from "express";
import { resetPassword } from "../../controllers/admin/resetPasswordController";

const router = express.Router();

router.post("/users/reset-password/:token", resetPassword);

export default router;
