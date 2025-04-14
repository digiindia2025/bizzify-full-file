import express from 'express';
import { loginUser } from '../../controllers/admin/loginController';  // Adjust path if necessary

const router = express.Router();

// Define the POST route for login
router.post('/login', loginUser);  // /api/user/login will call this route

export default router;
