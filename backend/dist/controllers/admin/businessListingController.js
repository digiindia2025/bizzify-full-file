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
exports.createBusinessListing = void 0;
const BusinessListing_1 = __importDefault(require("../../models/BusinessListing"));
const createBusinessListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if all required fields are present
        const { category, subcategories, about } = req.body;
        if (!category || !subcategories || subcategories.length === 0 || !about) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }
        // Save images
        const imageUrls = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];
        const newBusinessListing = new BusinessListing_1.default({
            category,
            subcategories,
            about,
            images: imageUrls,
        });
        yield newBusinessListing.save();
        res.status(201).json({ message: "Business listing created successfully", data: newBusinessListing });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});
exports.createBusinessListing = createBusinessListing;
