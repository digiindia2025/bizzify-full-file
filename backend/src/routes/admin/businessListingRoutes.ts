import express from 'express';
import upload from "../../middleware/multer";
import {
  createBusinessListing,
  createContact,
  createBusinessCategory,
  createBusinessTiming,
  createUpgradeListing,
  getAllFullListings,
  updateBusinessStatus,
  deleteBusinessListing,
  updatePublishStatus,
  getBusinessListingDetails,

   /////////////////////////////////////AASIB KHAN/////////////////////////////////

   getAllListings,
   createBusinessDetails,
   getAllListingsById,
   updateAllListingsById,
   deleteBusinessListing

} from '../../controllers/admin/businessListingController'; // Adjust the path as necessary

const router = express.Router();

// Define the routes with the correct controller functions
router.post('/create-business-listing', createBusinessListing);
router.post('/create-contact', createContact);
router.post('/create-business-category', createBusinessCategory);
router.post('/create-business-timing', createBusinessTiming);
router.post('/create-upgrade-listing', createUpgradeListing);
router.get('/get-all-listings', getAllFullListings);
router.put('/update-business-status/:id', updateBusinessStatus);
router.delete('/delete-business-listing/:id', deleteBusinessListing);
router.put('/update-publish-status/:id', updatePublishStatus);
router.get('/get-business-listing-details/:id', getBusinessListingDetails);

/////////////////////////////////////////////////////////////////////////////////////////


router.post("/createBusinessListing", upload.array("businessImages"), createBusinessDetails);
router.get("/get-all-listings", getAllListings)
router.get("/get-all-listings-by-id/:id", getAllListingsById)
router.post("/update-listings-by-id/:id", upload.array("businessImages"), updateAllListingsById)
router.get("/delete-business-listing/:id",deleteBusinessListing)

export default router;
