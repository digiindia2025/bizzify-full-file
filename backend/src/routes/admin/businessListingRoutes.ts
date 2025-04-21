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

  deleteBusinessListing      // Import Delete method
  // updateBusinessStatus,
  // updatePublishStatus,
  // getBusinessListingDetails,


} from "../../controllers/admin/businessListingController";
import upload from "../../middleware/multer";

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


// ✅ View individual listing details by ID
// router.get("/listing/:id", getBusinessListingDetails);

/// ✅ Delete a business listing by ID
router.delete("/listing/:id", deleteBusinessListing);


// ✅ Update business approval status
// router.patch("/update-business-status/:id", updateBusinessStatus);



//////////////////////////////////////////////////////////////////////

router.post("/createBusinessListing", upload.array("businessImages"), createBusinessDetails);
router.get("/get-all-listings", getAllListings)
router.get("/get-all-listings-by-id/:id", getAllListingsById)
router.post("/update-listings-by-id/:id", upload.array("businessImages"), updateAllListingsById)
router.get("/delete-business-listing/:id",deleteBusinessListing)
export default router;
