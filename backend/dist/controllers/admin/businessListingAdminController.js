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
exports.getBusinessListingById = exports.getAllBusinessListings = void 0;
const businessDetailsModel_1 = __importDefault(require("../../models/businessDetailsModel"));
const BusinessTiming_1 = __importDefault(require("../../models/BusinessTiming"));
const mongoose_1 = __importDefault(require("mongoose"));
// import BusinessCategories from "../../models/bussi";
const ContactPerson_1 = __importDefault(require("../../models/ContactPerson"));
const businessUpgradeModel_1 = __importDefault(require("../../models/businessUpgradeModel"));
const businessDetailsModel_2 = __importDefault(require("../../models/businessDetailsModel"));
const getAllBusinessListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const businessDetails = yield businessDetailsModel_1.default.find();
        const listingsWithFullData = yield Promise.all(businessDetails.map((detail) => __awaiter(void 0, void 0, void 0, function* () {
            const businessId = detail._id;
            const timings = yield BusinessTiming_1.default.findOne({ businessId });
            // const categories = await BusinessCategories.findOne({ businessId });
            const contact = yield ContactPerson_1.default.findOne({ businessId });
            const upgrade = yield businessUpgradeModel_1.default.findOne({ businessId });
            return {
                businessId,
                businessDetails: detail,
                timings,
                //   categories,
                contact,
                upgrade,
            };
        })));
        res.status(200).json(listingsWithFullData);
    }
    catch (error) {
        console.error("Error fetching full listings", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllBusinessListings = getAllBusinessListings;
// Controller function to get a single business listing by ID
const getBusinessListingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listingId = req.params.id;
        // Check if the ID is a valid ObjectId (for MongoDB/Mongoose)
        if (!mongoose_1.default.Types.ObjectId.isValid(listingId)) {
            return res.status(400).json({ message: 'Invalid Business Listing ID format' });
        }
        const listing = yield businessDetailsModel_2.default.findById(listingId).populate('user');
        if (listing) {
            res.status(200).json(listing);
        }
        else {
            res.status(404).json({ message: `Business listing with ID ${listingId} not found` });
        }
    }
    catch (error) {
        console.error(`Error fetching business listing with ID ${req.params.id}:`, error);
        res.status(500).json({ message: "Failed to fetch business listing" });
    }
});
exports.getBusinessListingById = getBusinessListingById;
