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
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, text, html }) {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail', // ya aapka SMTP service (SendGrid, Outlook, etc.)
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html,
    };
    yield transporter.sendMail(mailOptions);
});
exports.default = sendEmail;
