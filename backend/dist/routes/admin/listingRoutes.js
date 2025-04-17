"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/admin/listingsRoutes.ts
const listingController_1 = require("../../controllers/admin/listingController");
const express_1 = __importDefault(require("express"));
const listingController_2 = require("../../controllers/admin/listingController");
const router = express_1.default.Router();
// ✅ GET all listings with pagination
router.get("/listings", listingController_2.getAllListingsController);
// ✅ PATCH route to update a specific listing (status, publishStatus, etc.)
router.patch("/listings/:id", listingController_2.updateListingController);
// ✅ DELETE route to remove a specific listing by ID
router.delete("/listings/:id", listingController_2.deleteListingController);
// ✅ POST route to perform bulk actions on multiple listings (optional)
router.post("/listings/bulk-action", listingController_2.bulkActionListingController);
router.post("/listings/create", listingController_1.createListingController);
exports.default = router;
