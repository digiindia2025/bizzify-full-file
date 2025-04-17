"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resetPasswordController_1 = require("../../controllers/admin/resetPasswordController");
const router = express_1.default.Router();
router.post("/users/reset-password/:token", resetPasswordController_1.resetPassword);
exports.default = router;
