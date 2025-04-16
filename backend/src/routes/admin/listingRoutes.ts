// routes/admin/listingsRoutes.ts
import { createListingController } from "../../controllers/admin/listingController";
import express from "express";

import {
  getAllListingsController,
  updateListingController,
  deleteListingController
} from "../../controllers/admin/listingController";


const router = express.Router();

// ✅ GET all listings with pagination
router.get("/listings", getAllListingsController);

// ✅ PATCH route to update a specific listing (status, publishStatus, etc.)
router.patch("/listings/:id", updateListingController);
// listing delete

// routes/admin/listingRoutes.ts
router.delete("/listings/:id", deleteListingController);





// ✅ POST route to perform bulk actions on multiple listings (optional)
// router.post("/listings/bulk-action", bulkActionListingController);


router.post("/listings/create", createListingController);

export default router;
