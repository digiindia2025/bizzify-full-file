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
exports.setBusinessTimings = exports.getBusinessTimings = void 0;
const BusinessTiming_1 = __importDefault(require("../../models/BusinessTiming"));
// Get all business timings
const getBusinessTimings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timings = yield BusinessTiming_1.default.find();
        res.status(200).json(timings);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving business timings" });
    }
});
exports.getBusinessTimings = getBusinessTimings;
// Add or update business timings
const setBusinessTimings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const timings = req.body.timings; // Get timings from the request body
    if (!timings || timings.length === 0) {
        return res.status(400).json({ message: "No timings provided" });
    }
    // Validate timings for each day
    for (let timing of timings) {
        // If the day is open, make sure openTime and closeTime are provided
        if (timing.isOpen) {
            if (!timing.openTime || !timing.closeTime) {
                return res.status(400).json({ message: `Open and Close times are required for ${timing.day}` });
            }
        }
        else {
            // If the day is closed, make sure timings are not set
            if (timing.openTime || timing.closeTime) {
                return res.status(400).json({ message: `No times should be provided for closed day ${timing.day}` });
            }
        }
    }
    try {
        // Delete existing business timings (optional based on your needs)
        yield BusinessTiming_1.default.deleteMany();
        // Save new business timings
        const savedTimings = yield BusinessTiming_1.default.insertMany(timings);
        res.status(201).json(savedTimings);
    }
    catch (error) {
        res.status(500).json({ message: "Error saving business timings" });
    }
});
exports.setBusinessTimings = setBusinessTimings;
