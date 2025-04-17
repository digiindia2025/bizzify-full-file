import express from "express";
import { 
  createBusinessCategory, 
  createBusinessDetails, 
  createBusinessTiming, 
  createBusinessContact, 
  createUpgradeListing 
} from "../../controllers/admin/businessController";

const router = express.Router();

// POST routes for each form
router.post("/category", createBusinessCategory);
router.post("/details", createBusinessDetails);
router.post("/timing", createBusinessTiming);
router.post("/contact", createBusinessContact);
router.post("/upgrade", createUpgradeListing);

export default router;
