import express from "express";
import { getDashboardCounts } from "../../controllers/admin/dashboardCountController";

const router = express.Router();

router.get("/counts", getDashboardCounts);

export default router;
