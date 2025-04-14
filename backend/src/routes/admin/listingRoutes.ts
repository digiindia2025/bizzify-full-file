// routes/admin/listingsRoutes.ts
import { createListingController } from "../../controllers/admin/listingController";
import express from "express";
import {
  getAllListingsController,
  updateListingController,   // ✅ Import controller for updating a listing
  deleteListingController,  // ✅ Import controller for deleting a listing
  bulkActionListingController, // ✅ Optional: for handling bulk actions
} from "../../controllers/admin/listingController";

const router = express.Router();

// ✅ GET all listings with pagination
router.get("/listings", getAllListingsController);

// ✅ PATCH route to update a specific listing (status, publishStatus, etc.)
router.patch("/listings/:id", updateListingController);

// ✅ DELETE route to remove a specific listing by ID
router.delete("/listings/:id", deleteListingController);

// ✅ POST route to perform bulk actions on multiple listings (optional)
router.post("/listings/bulk-action", bulkActionListingController);


router.post("/listings/create", createListingController);

export default router;
