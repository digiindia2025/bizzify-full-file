"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const listingSchema = new mongoose_1.default.Schema({
    title: String,
    category: String,
    user: String,
    createdDate: String,
    publishedDate: String,
    status: String,
    businessStatus: String,
    trustStatus: String,
});
const Listing = mongoose_1.default.model("Listing", listingSchema);
exports.default = Listing;
