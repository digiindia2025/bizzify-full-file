"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const businessDetailsSchema = new mongoose_1.default.Schema({
    businessName: { type: String, required: true },
    pinCode: { type: String, required: true },
    building: { type: String, required: true },
    street: { type: String, required: true },
    area: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    direction: { type: String },
    website: { type: String },
}, { timestamps: true });
const BusinessDetails = mongoose_1.default.model("BusinessDetails", businessDetailsSchema);
exports.default = BusinessDetails;
