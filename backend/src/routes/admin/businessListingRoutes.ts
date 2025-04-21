import express from 'express';
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

export default router;
