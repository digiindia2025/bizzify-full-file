import express from "express";
import {
  createContact,
  createBusinessDetails,
  createBusinessCategory,
  createBusinessTiming,
  createUpgradeListing,
  createBusinessListing, // optional: if you want to save all together
  getAllFullListings,
  deleteBusinessListing      // Import Delete method
  // updateBusinessStatus,
  // updatePublishStatus,
  // getBusinessListingDetails,
} from "../../controllers/admin/businessListingController";

const router = express.Router();

// Step-by-step routes
router.post("/createContact", createContact);
router.post("/createBusinessDetails", createBusinessDetails);
router.post('/createBusinessCategory', createBusinessCategory);
router.post("/createBusinessTiming", createBusinessTiming); // Business timing
router.post("/business/upgrade", createUpgradeListing);
// router.post("/upgradeListing", upgradeListing);

// Optional: Full form submission in one go
router.post("/create", createBusinessListing);

// ✅ Get all listings (merged view)
router.get("/getAllFullListings", getAllFullListings);

// ✅ View individual listing details by ID
// router.get("/listing/:id", getBusinessListingDetails);

/// ✅ Delete a business listing by ID
router.delete("/listing/:id", deleteBusinessListing);

// ✅ Update business approval status
// router.patch("/update-business-status/:id", updateBusinessStatus);





export default router;
