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
exports.createEnquiry = exports.getAllEnquiries = void 0;
const enquiryModel_1 = __importDefault(require("../../models/enquiryModel"));
// GET all enquiries
const getAllEnquiries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enquiries = yield enquiryModel_1.default.find();
        res.status(200).json(enquiries);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch enquiries" });
    }
});
exports.getAllEnquiries = getAllEnquiries;
// POST create a new enquiry
const createEnquiry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, title, name, requirement } = req.body;
        const newEnquiry = new enquiryModel_1.default({ userName, title, name, requirement });
        yield newEnquiry.save();
        res.status(201).json(newEnquiry);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create enquiry" });
    }
});
exports.createEnquiry = createEnquiry;
