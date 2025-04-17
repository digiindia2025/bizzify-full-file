"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// utils/multerSetup.ts
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Define storage settings for multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const fileExtension = path_1.default.extname(file.originalname);
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtension}`;
        cb(null, fileName); // Name the file with a unique timestamp
    },
});
// Initialize multer with storage settings
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
