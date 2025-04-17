"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Membership = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const historySchema = new mongoose_1.default.Schema({
    status: { type: String },
    date: { type: Date, default: Date.now },
}, { _id: false });
const membershipSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, required: true }, // e.g., "Premium Plan"
    status: { type: String, required: true }, // e.g., "Active", "Inactive"
    paymentStatus: { type: String, default: "Pending" }, // e.g., "Complete", "Pending"
    paymentMode: { type: String }, // e.g., "Razorpay", "UPI"
    startDate: { type: Date }, // e.g., "2025-02-21"
    endDate: { type: Date }, // e.g., "2025-06-19"
    history: [historySchema], // array of { status, date }
}, { timestamps: true });
exports.Membership = mongoose_1.default.model("Membership", membershipSchema);
