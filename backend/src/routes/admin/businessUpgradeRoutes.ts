import express from 'express';
import { upgradeBusiness } from '../../controllers/admin/businessUpgradeController';

const router = express.Router();

// Endpoint to upgrade business
router.post('/api/business/upgrade', upgradeBusiness);

export default router;
