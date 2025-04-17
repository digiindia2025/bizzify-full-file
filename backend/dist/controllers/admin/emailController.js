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
exports.sendCustomEmail = void 0;
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const sendCustomEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, subject, message } = req.body;
        yield (0, sendEmail_1.default)({
            to: email,
            subject,
            text: message,
        });
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
    catch (error) {
        console.error('Email Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});
exports.sendCustomEmail = sendCustomEmail;
