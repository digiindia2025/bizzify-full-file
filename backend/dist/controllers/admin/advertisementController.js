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
exports.deleteAdvertisement = exports.updateAdvertisement = exports.getAdvertisementById = exports.getAllAdvertisements = exports.createAdvertisement = void 0;
const Advertisement_1 = __importDefault(require("../../models/Advertisement"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Create Advertisement
const createAdvertisement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, type, businessCategory, subCategory, childCategory, redirectUrl, status, } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        if (!title || !type || !businessCategory || !status || !image) {
            return res.status(400).json({ error: "Required fields missing" });
        }
        const newAd = new Advertisement_1.default({
            title,
            type,
            businessCategory,
            subCategory,
            childCategory,
            redirectUrl,
            status,
            image,
        });
        const savedAd = yield newAd.save();
        res.status(201).json(savedAd);
    }
    catch (err) {
        console.error("Error creating advertisement:", err);
        res.status(500).json({ error: "Failed to create advertisement", details: err.message || err });
    }
});
exports.createAdvertisement = createAdvertisement;
// Get All Advertisements
const getAllAdvertisements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ads = yield Advertisement_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(ads);
    }
    catch (err) {
        console.error("Error fetching advertisements:", err);
        res.status(500).json({ error: "Failed to fetch advertisements", details: err.message || err });
    }
});
exports.getAllAdvertisements = getAllAdvertisements;
// Get Advertisement by ID
const getAdvertisementById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ad = yield Advertisement_1.default.findById(req.params.id);
        if (!ad)
            return res.status(404).json({ error: "Advertisement not found" });
        res.status(200).json(ad);
    }
    catch (err) {
        console.error("Error fetching advertisement by ID:", err);
        res.status(500).json({ error: "Failed to fetch advertisement", details: err.message || err });
    }
});
exports.getAdvertisementById = getAdvertisementById;
// Update Advertisement
const updateAdvertisement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, type, businessCategory, subCategory, childCategory, redirectUrl, status, } = req.body;
        const existingAd = yield Advertisement_1.default.findById(req.params.id);
        if (!existingAd)
            return res.status(404).json({ error: "Advertisement not found" });
        // If a new image is uploaded, delete old one
        if (((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) && existingAd.image) {
            const oldImagePath = path_1.default.join(__dirname, "../../../uploads", existingAd.image);
            if (fs_1.default.existsSync(oldImagePath))
                fs_1.default.unlinkSync(oldImagePath);
            existingAd.image = req.file.filename;
        }
        // Update fields
        existingAd.title = title !== null && title !== void 0 ? title : existingAd.title;
        existingAd.type = type !== null && type !== void 0 ? type : existingAd.type;
        existingAd.businessCategory = businessCategory !== null && businessCategory !== void 0 ? businessCategory : existingAd.businessCategory;
        existingAd.subCategory = subCategory !== null && subCategory !== void 0 ? subCategory : existingAd.subCategory;
        existingAd.childCategory = childCategory !== null && childCategory !== void 0 ? childCategory : existingAd.childCategory;
        existingAd.redirectUrl = redirectUrl !== null && redirectUrl !== void 0 ? redirectUrl : existingAd.redirectUrl;
        existingAd.status = status !== null && status !== void 0 ? status : existingAd.status;
        const updatedAd = yield existingAd.save();
        res.status(200).json(updatedAd);
    }
    catch (err) {
        console.error("Error updating advertisement:", err);
        res.status(500).json({ error: "Failed to update advertisement", details: err.message || err });
    }
});
exports.updateAdvertisement = updateAdvertisement;
// Delete Advertisement
const deleteAdvertisement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ad = yield Advertisement_1.default.findById(req.params.id);
        if (!ad)
            return res.status(404).json({ error: "Advertisement not found" });
        // Delete image file
        if (ad.image) {
            const imagePath = path_1.default.join(__dirname, "../../../uploads", ad.image);
            if (fs_1.default.existsSync(imagePath))
                fs_1.default.unlinkSync(imagePath);
        }
        yield Advertisement_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Advertisement deleted successfully" });
    }
    catch (err) {
        console.error("Error deleting advertisement:", err);
        res.status(500).json({ error: "Failed to delete advertisement", details: err.message || err });
    }
});
exports.deleteAdvertisement = deleteAdvertisement;
