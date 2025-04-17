import express from "express";
import { createDeal, getAllDeals } from "../../controllers/admin/dealController";

const router = express.Router();

router.post("/create", createDeal);
router.get("/", getAllDeals);

export default router;
