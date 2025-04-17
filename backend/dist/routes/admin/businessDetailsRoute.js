"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const businessDetailsController_1 = require("../../controllers/admin/businessDetailsController");
const router = express_1.default.Router();
router.post("/business-details", businessDetailsController_1.createBusinessDetails);
exports.default = router;
