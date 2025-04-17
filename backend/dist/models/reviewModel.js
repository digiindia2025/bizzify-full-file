"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    email: String,
    rating: Number,
    content: String,
    date: {
        type: Date,
        default: Date.now,
    },
});
const Review = mongoose_1.default.model("Review", reviewSchema);
exports.default = Review;
