"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSupportTicket = exports.updateSupportTicketStatus = exports.getSupportTicketById = exports.createSupportTicket = exports.getSupportTickets = void 0;
const SupportTicket_1 = __importDefault(require("../../models/SupportTicket"));
// Get all support tickets
const getSupportTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield SupportTicket_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: tickets });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error fetching support tickets", error });
    }
});
exports.getSupportTickets = getSupportTickets;
// Create a new support ticket
const createSupportTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, priority, dateTime, status } = req.body;
        const newTicket = new SupportTicket_1.default({ title, priority, dateTime, status });
        yield newTicket.save();
        res.status(201).json({ success: true, data: newTicket });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error creating support ticket", error });
    }
});
exports.createSupportTicket = createSupportTicket;
// Get a support ticket by ID
const getSupportTicketById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield SupportTicket_1.default.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ success: false, message: "Support ticket not found" });
        }
        res.status(200).json({ success: true, data: ticket });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error fetching support ticket", error });
    }
});
exports.getSupportTicketById = getSupportTicketById;
// Update support ticket status
const updateSupportTicketStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const updatedTicket = yield SupportTicket_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedTicket) {
            return res.status(404).json({ success: false, message: "Support ticket not found" });
        }
        res.status(200).json({ success: true, data: updatedTicket });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error updating support ticket status", error });
    }
});
exports.updateSupportTicketStatus = updateSupportTicketStatus;
// Delete a support ticket
const deleteSupportTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTicket = yield SupportTicket_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTicket) {
            return res.status(404).json({ success: false, message: "Support ticket not found" });
        }
        res.status(200).json({ success: true, message: "Support ticket deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error deleting support ticket", error });
    }
});
exports.deleteSupportTicket = deleteSupportTicket;
