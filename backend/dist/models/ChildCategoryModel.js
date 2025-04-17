"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/ChildCategory.ts
const mongoose_1 = __importDefault(require("mongoose"));
const childCategorySchema = new mongoose_1.default.Schema({
    parentCategory: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});
const ChildCategory = mongoose_1.default.model("ChildCategory", childCategorySchema);
exports.default = ChildCategory;
