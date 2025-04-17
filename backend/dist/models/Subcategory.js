"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subcategorySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
});
exports.default = mongoose_1.default.model("Subcategory", subcategorySchema);
