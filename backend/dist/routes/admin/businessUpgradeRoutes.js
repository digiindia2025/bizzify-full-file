"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const businessUpgradeController_1 = require("../../controllers/admin/businessUpgradeController");
const router = express_1.default.Router();
// Endpoint to upgrade business
router.post('/api/business/upgrade', businessUpgradeController_1.upgradeBusiness);
exports.default = router;
