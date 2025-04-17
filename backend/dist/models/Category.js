"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    createDate: {
        type: String,
        default: () => new Date().toISOString().split("T")[0],
    },
});
exports.default = mongoose_1.default.model("Category", CategorySchema);
