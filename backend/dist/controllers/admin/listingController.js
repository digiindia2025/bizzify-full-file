"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListingController = exports.bulkActionListingController = exports.deleteListingController = exports.updateListingController = exports.getAllListingsController = void 0;
const listingModel_1 = __importDefault(require("../../models/listingModel")); // Adjust path if needed
// ✅ GET: Fetch all listings with pagination
const getAllListingsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const listings = yield listingModel_1.default.find().skip(skip).limit(limit);
        const total = yield listingModel_1.default.countDocuments();
        res.status(200).json({ listings, total });
    }
    catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ message: "Error fetching listings", error });
    }
});
exports.getAllListingsController = getAllListingsController;
// ✅ PATCH: Update a specific listing (status, publishedDate, etc.)  
const updateListingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const listing = yield listingModel_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        res.status(200).json({ message: "Listing updated successfully", listing });
    }
    catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).json({ message: "Error updating listing", error });
    }
});
exports.updateListingController = updateListingController;
// ✅ DELETE: Delete a specific listing
const deleteListingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const listing = yield listingModel_1.default.findByIdAndDelete(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        res.status(200).json({ message: "Listing deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting listing:", error);
        res.status(500).json({ message: "Error deleting listing", error });
    }
});
exports.deleteListingController = deleteListingController;
// ✅ POST: Bulk action (e.g., approve/reject/publish multiple listings)
const bulkActionListingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids, action } = req.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Invalid IDs" });
        }
        let update = {};
        if (action === "Approve") {
            update = {
                status: "Approved",
                businessStatus: "Approved",
                trustStatus: "Approved",
            };
        }
        else if (action === "Reject") {
            update = {
                status: "Rejected",
                businessStatus: "Not Approved",
                trustStatus: "Not Approved",
            };
        }
        else if (action === "Publish") {
            update = { publishedDate: "Published" };
        }
        else if (action === "Unpublish") {
            update = { publishedDate: "Unpublished" };
        }
        yield listingModel_1.default.updateMany({ _id: { $in: ids } }, update);
        res.status(200).json({ message: `Listings ${action}d successfully.` });
    }
    catch (error) {
        console.error("Bulk action failed:", error);
        res.status(500).json({ message: "Bulk action failed", error });
    }
});
exports.bulkActionListingController = bulkActionListingController;
const createListingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listing = new listingModel_1.default(req.body);
        yield listing.save();
        res.status(201).json({ message: "Listing created successfully", listing });
    }
    catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({ message: "Error creating listing", error });
    }
});
exports.createListingController = createListingController;
