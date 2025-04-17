"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const linkSchema = new mongoose_1.default.Schema({
    link: { type: String, required: true },
    title: { type: String, required: true },
}, { timestamps: true });
exports.Link = mongoose_1.default.model("Link", linkSchema);
