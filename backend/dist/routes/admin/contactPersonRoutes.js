"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/admin/contactPersonRoutes.ts
const express_1 = __importDefault(require("express"));
const contactPersonController_1 = require("../../controllers/admin/contactPersonController");
const router = express_1.default.Router();
router.post("/contact", contactPersonController_1.createContactPerson);
exports.default = router;
