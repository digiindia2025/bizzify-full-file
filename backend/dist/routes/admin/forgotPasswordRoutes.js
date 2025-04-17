"use strict";
// src/routes/admin/forgotPasswordRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const forgotPasswordController_1 = require("../../controllers/admin/forgotPasswordController"); // ✅ Path correct hona chahiye
const router = express_1.default.Router();
router.post('/forgot-password', forgotPasswordController_1.forgotPassword); // ✅ forgotPassword must not be undefined
exports.default = router;
