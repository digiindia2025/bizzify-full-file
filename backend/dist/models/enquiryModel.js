"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enquirySchema = new mongoose_1.default.Schema({
    userName: { type: String },
    title: { type: String, required: true },
    name: { type: String, required: true },
    requirement: { type: String },
}, { timestamps: true });
const Enquiry = mongoose_1.default.model("Enquiry", enquirySchema);
exports.default = Enquiry;
