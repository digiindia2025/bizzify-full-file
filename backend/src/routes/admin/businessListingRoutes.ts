import express from "express";
import {
  createContact,
  createBusinessDetails,
  createBusinessCategory,
  createBusinessTiming,
  createUpgradeListing,
  createBusinessListing, // optional: if you want to save all together
  getAllFullListings,
  deleteBusinessListing,      // Import Delete method
  updateBusinessListing,      // Import Update method
  getBusinessListingDetails, // ✅ Import the new controller
} from "../../controllers/admin/businessListingController";

const router = express.Router();

// Step-by-step routes
router.post("/createContact", createContact);
router.post("/createBusinessDetails", createBusinessDetails);
router.post('/createBusinessCategory', createBusinessCategory);
router.post('/createBusinessTiming', createBusinessTiming);
router.post("/createUpgradeListing", createUpgradeListing);
// router.post("/upgradeListing", upgradeListing);

// Optional: Full form submission in one go
router.post("/create", createBusinessListing);

router.get("/getAllFullListings", getAllFullListings); // ✅ New route

// Add the DELETE route
router.delete("/delete-business-listing/:id", deleteBusinessListing); // Ensure this matches your frontend request


// Add the PATCH route
router.patch("/update-business-listing/:id", updateBusinessListing); // PATCH by ID

// Update a business listing by ID
router.patch("/update-business-listing/:id", updateBusinessListing);

export default router;
