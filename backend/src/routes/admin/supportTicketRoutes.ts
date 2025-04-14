import express from "express";
import {
  getSupportTickets,
  createSupportTicket,
  getSupportTicketById,
  updateSupportTicketStatus,
  deleteSupportTicket,
} from "../../controllers/admin/supportTicketController";

const router = express.Router();

// GET all support tickets
router.get("/support-tickets", getSupportTickets);

// POST a new support ticket
router.post("/support-tickets", createSupportTicket);

// GET a single support ticket by ID
router.get("/support-tickets/:id", getSupportTicketById);

// PUT update status of a ticket (open/closed)
router.put("/support-tickets/:id", updateSupportTicketStatus); // 👈 update route

// DELETE a support ticket
router.delete("/support-tickets/:id", deleteSupportTicket);

export default router;
