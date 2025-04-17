"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/ContactPerson.ts
const mongoose_1 = __importDefault(require("mongoose"));
const contactPersonSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    alternateNumbers: [{ type: String }],
    whatsappNumber: { type: String, required: true },
    email: { type: String, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("ContactPerson", contactPersonSchema);
