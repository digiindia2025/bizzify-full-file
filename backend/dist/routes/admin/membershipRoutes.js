"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const membershipController_1 = require("../../controllers/admin/membershipController");
const router = express_1.default.Router();
router.get("/memberships", membershipController_1.getAllMemberships);
router.post("/memberships", membershipController_1.createMembership); // For testing with Postman
router.put("/memberships/:id", membershipController_1.updateMembership);
router.delete("/memberships/:id", membershipController_1.deleteMembership);
exports.default = router;
