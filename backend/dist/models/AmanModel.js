"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmanModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AmanSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});
// 👇 This connects to the 'aman' collection in the 'Biziffy' DB
exports.AmanModel = mongoose_1.default.model("Aman", AmanSchema, "aman");
