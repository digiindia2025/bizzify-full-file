"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supportTicketController_1 = require("../../controllers/admin/supportTicketController");
const router = express_1.default.Router();
// GET all support tickets
router.get("/support-tickets", supportTicketController_1.getSupportTickets);
// POST a new support ticket
router.post("/support-tickets", supportTicketController_1.createSupportTicket);
// GET a single support ticket by ID
router.get("/support-tickets/:id", supportTicketController_1.getSupportTicketById);
// PUT update status of a ticket (open/closed)
router.put("/support-tickets/:id", supportTicketController_1.updateSupportTicketStatus); // 👈 update route
// DELETE a support ticket
router.delete("/support-tickets/:id", supportTicketController_1.deleteSupportTicket);
exports.default = router;
