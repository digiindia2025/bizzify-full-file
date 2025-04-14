import express from 'express';
import { sendCustomEmail } from '../../controllers/admin/emailController';

const router = express.Router();

router.post('/send-email', sendCustomEmail);

export default router;
