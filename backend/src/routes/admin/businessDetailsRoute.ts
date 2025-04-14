import express from "express";
import { createBusinessDetails } from "../../controllers/admin/businessDetailsController";

const router = express.Router();

router.post("/business-details", createBusinessDetails);

export default router;
