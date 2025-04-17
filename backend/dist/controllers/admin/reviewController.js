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
exports.createReview = exports.approveReview = exports.getAllReviews = void 0;
const reviewModel_1 = __importDefault(require("../../models/reviewModel"));
const getAllReviews = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield reviewModel_1.default.find();
        res.json(reviews);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
});
exports.getAllReviews = getAllReviews;
const approveReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const review = yield reviewModel_1.default.findByIdAndUpdate(id, { approved: true }, { new: true });
        if (!review)
            return res.status(404).json({ error: "Review not found" });
        res.json({ message: "Review approved", review });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to approve review" });
    }
});
exports.approveReview = approveReview;
// Optional: Create review (for testing)
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = new reviewModel_1.default(req.body);
        yield review.save();
        res.status(201).json(review);
    }
    catch (err) {
        console.error("Create Review Error:", err.message, err);
        res.status(500).json({ error: "Failed to create review" });
    }
});
exports.createReview = createReview;
