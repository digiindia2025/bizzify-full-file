"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const supportTicketSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high", "urgent"], required: true },
    dateTime: { type: String, required: true },
    status: { type: String, enum: ["open", "closed"], default: "open" },
});
exports.default = mongoose_1.default.model("SupportTicket", supportTicketSchema);
