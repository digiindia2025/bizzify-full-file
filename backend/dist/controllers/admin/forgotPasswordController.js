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
exports.forgotPassword = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const crypto_1 = __importDefault(require("crypto"));
const sendEmail_1 = __importDefault(require("../../utils/sendEmail")); // Adjust path if needed
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found." });
        const otp = crypto_1.default.randomInt(100000, 999999).toString();
        user.resetToken = otp;
        user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
        yield user.save();
        try {
            yield (0, sendEmail_1.default)({
                to: user.email,
                subject: 'Password Reset OTP',
                text: `Your OTP is ${otp}. It will expire in 15 minutes.`,
            });
            res.status(200).json({ message: 'OTP sent to email.' });
        }
        catch (emailError) {
            console.error('Email sending failed:', emailError);
            res.status(500).json({ message: 'Error sending email' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.forgotPassword = forgotPassword;
