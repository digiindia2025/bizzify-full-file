import express from "express";
import {
  createContact,
  createBusinessDetails,
  createBusinessCategory,
  createBusinessTiming,
  createUpgradeListing,
  createBusinessListing, // optional: if you want to save all together
} from "../../controllers/admin/businessListingController";

const router = express.Router();

// Step-by-step routes
router.post("/createContact", createContact);
router.post("/createBusinessDetails", createBusinessDetails);
router.post('/createBusinessCategory', createBusinessCategory);
router.post('/createBusinessTiming', createBusinessTiming);
router.post("/createUpgradeListing", createUpgradeListing);

// Optional: Full form submission in one go
router.post("/create", createBusinessListing);

export default router;
