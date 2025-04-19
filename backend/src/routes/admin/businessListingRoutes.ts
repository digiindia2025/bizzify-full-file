import express from "express";
import {
  createContact,
  createBusinessCategory,
  createBusinessTiming,
  createUpgradeListing,
  createBusinessListing, // optional: if you want to save all together
  getAllFullListings,
  deleteBusinessListing,      // Import Delete method
  updateBusinessStatus,     // Import Update method
  updatePublishStatus, // ✅ Import the new controller
  /////////////////////////////////////AASIB KHAN/////////////////////////////////

  getAllListings,
  createBusinessDetails,
  getAllListingsById,
  updateAllListingsById,
  deleteBusinessListing

} from "../../controllers/admin/businessListingController";
import upload from "../../middleware/multer";

const router = express.Router();
// Step-by-step routes
router.post("/createContact", createContact);
router.post("/createBusinessDetails", createBusinessDetails);
router.post('/createBusinessCategory', createBusinessCategory);
router.post("/createBusinessTiming", createBusinessTiming); // Business timing
router.post("/createUpgradeListing", createUpgradeListing);
// router.post("/upgradeListing", upgradeListing);

// Optional: Full form submission in one go
router.post("/create", createBusinessListing);

router.get("/getAllFullListings", getAllFullListings); // ✅ New route

// Add the DELETE route
router.delete("/delete-business-listing/:id", deleteBusinessListing); // Ensure this matches your frontend request


// Add the PATCH route
// routes/admin.js
router.patch('/update-business-listing/:id', updateBusinessStatus);
router.patch('/update-publish-status/:id', updatePublishStatus);

//////////////////////////////////////////////////////////////////////

router.post("/createBusinessListing", upload.array("businessImages"), createBusinessDetails);
router.get("/get-all-listings", getAllListings)
router.get("/get-all-listings-by-id/:id", getAllListingsById)
router.post("/update-listings-by-id/:id", upload.array("businessImages"), updateAllListingsById)
router.get("/delete-business-listing/:id",deleteBusinessListing)
export default router;
