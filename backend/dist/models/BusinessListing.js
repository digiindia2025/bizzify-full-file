"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/BusinessListing.ts
const mongoose_1 = __importDefault(require("mongoose"));
const businessListingSchema = new mongoose_1.default.Schema({
    category: { type: String, required: true },
    subcategories: [String],
    about: { type: String, required: true },
    images: [String], // URLs or file paths
}, { timestamps: true });
exports.default = mongoose_1.default.model("BusinessListing", businessListingSchema);
