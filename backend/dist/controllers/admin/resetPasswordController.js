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
exports.resetPassword = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;
        if (!password || !confirmPassword) {
            return res.status(400).json({ message: "Both password fields are required." });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }
        // Find user with matching resetToken and check if it hasn't expired
        const user = yield userModel_1.default.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: new Date() }, // still valid
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }
        // Hash the new password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        user.password = hashedPassword;
        // Clear the reset token fields
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        yield user.save();
        res.status(200).json({ message: "Password has been reset successfully." });
    }
    catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ message: "Failed to reset password", error: error.message });
    }
});
exports.resetPassword = resetPassword;
