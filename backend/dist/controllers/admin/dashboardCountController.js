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
exports.getDashboardCounts = void 0;
const listingModel_1 = __importDefault(require("../../models/listingModel"));
const Advertisement_1 = __importDefault(require("../../models/Advertisement"));
const User_1 = __importDefault(require("../../models/User"));
const Category_1 = __importDefault(require("../../models/Category"));
const Subcategory_1 = __importDefault(require("../../models/Subcategory"));
const ChildCategoryModel_1 = __importDefault(require("../../models/ChildCategoryModel"));
const Contact_1 = require("../../models/Contact");
// import SupportTicket from "../../models/SupportTicket";
// import Enquiry from "../../models/Enquiry";
// import LinkModel from "../../models/Link";
// import Review from "../../models/Review";
// import Membership from "../../models/Membership";
const getDashboardCounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [listings, advertisements, users, categories, subcategories, childCategories, contacts,] = yield Promise.all([
            listingModel_1.default.countDocuments(),
            Advertisement_1.default.countDocuments(),
            User_1.default.countDocuments(),
            Category_1.default.countDocuments(),
            Subcategory_1.default.countDocuments(),
            ChildCategoryModel_1.default.countDocuments(),
            Contact_1.Contact.countDocuments(),
            //   SupportTicket.countDocuments(),
            //   Enquiry.countDocuments(),
            //   LinkModel.countDocuments(),
            //   Review.countDocuments(),
            //   Membership.countDocuments(),
        ]);
        res.json({
            listings,
            advertisements,
            users,
            categories,
            subcategories,
            childCategories,
            contacts,
        });
    }
    catch (err) {
        console.error("Error fetching dashboard counts:", err);
        res.status(500).json({ message: "Failed to get dashboard counts" });
    }
});
exports.getDashboardCounts = getDashboardCounts;
