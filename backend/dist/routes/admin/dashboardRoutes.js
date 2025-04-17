"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardCountController_1 = require("../../controllers/admin/dashboardCountController");
const router = express_1.default.Router();
router.get("/counts", dashboardCountController_1.getDashboardCounts);
exports.default = router;
