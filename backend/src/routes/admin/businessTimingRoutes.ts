// routes/businessTimingRoutes.ts
import express from "express";
import { getBusinessTimings, setBusinessTimings } from "../../controllers/admin/businessTimingController";

const router = express.Router();

router.get("/timings", getBusinessTimings);  // Fetch all business timings
router.post("/timings", setBusinessTimings); // Save or update business timings

export default router;
