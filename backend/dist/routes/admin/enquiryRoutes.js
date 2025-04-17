"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enquiryController_1 = require("../../controllers/admin/enquiryController");
const router = express_1.default.Router();
router.get("/", enquiryController_1.getAllEnquiries);
router.post("/", enquiryController_1.createEnquiry);
exports.default = router;
