// import express from "express";
// import { getAllBusinessListings } from "../../controllers/admin/businessListingAdminController";

// const router = express.Router();

// router.get("/all-listings", getAllBusinessListings);

// export default router;

import express from "express";
import {
  getAllBusinessListings,
  getBusinessListingById, // Import the new controller function
} from "../../controllers/admin/businessListingAdminController";

const router = express.Router();

router.get("/all-listings", getAllBusinessListings);

// New route to fetch a single listing by ID
router.get("/listings/:id", getBusinessListingById);

export default router;