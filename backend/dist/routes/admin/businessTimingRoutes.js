"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/businessTimingRoutes.ts
const express_1 = __importDefault(require("express"));
const businessTimingController_1 = require("../../controllers/admin/businessTimingController");
const router = express_1.default.Router();
router.get("/timings", businessTimingController_1.getBusinessTimings); // Fetch all business timings
router.post("/timings", businessTimingController_1.setBusinessTimings); // Save or update business timings
exports.default = router;
