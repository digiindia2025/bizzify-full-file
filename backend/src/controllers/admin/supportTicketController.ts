import { Request, Response } from "express";
import SupportTicket from "../../models/SupportTicket";

// Get all support tickets
export const getSupportTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching support tickets", error });
  }
};

// Create a new support ticket
export const createSupportTicket = async (req: Request, res: Response) => {
  try {
    const { title, priority, dateTime, status } = req.body;

    const newTicket = new SupportTicket({ title, priority, dateTime, status });
    await newTicket.save();

    res.status(201).json({ success: true, data: newTicket });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating support ticket", error });
  }
};

// Get a support ticket by ID
export const getSupportTicketById = async (req: Request, res: Response) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Support ticket not found" });
    }
    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching support ticket", error });
  }
};

// Update support ticket status
export const updateSupportTicketStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const updatedTicket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedTicket) {
      return res.status(404).json({ success: false, message: "Support ticket not found" });
    }
    res.status(200).json({ success: true, data: updatedTicket });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating support ticket status", error });
  }
};

// Delete a support ticket
export const deleteSupportTicket = async (req: Request, res: Response) => {
  try {
    const deletedTicket = await SupportTicket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) {
      return res.status(404).json({ success: false, message: "Support ticket not found" });
    }
    res.status(200).json({ success: true, message: "Support ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting support ticket", error });
  }
};
