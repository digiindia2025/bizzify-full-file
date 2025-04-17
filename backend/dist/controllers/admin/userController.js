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
exports.toggleUserStatus = exports.updateUserStatus = exports.deleteUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongodb_1 = require("mongodb");
// ✅ POST - Create user (Signup)
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, phone, password, confirmPassword, status } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = yield userModel_1.default.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.default({
            fullName,
            email: normalizedEmail,
            phone,
            password: hashedPassword,
            status: status || "active",
        });
        const savedUser = yield newUser.save();
        res.status(201).json({
            id: savedUser._id,
            fullName: savedUser.fullName,
            email: savedUser.email,
            phone: savedUser.phone,
            status: savedUser.status,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Failed to create user", error: error.message });
    }
});
exports.createUser = createUser;
// ✅ GET - All users with pagination
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const users = yield userModel_1.default.find({}, "-password").skip(skip).limit(limit);
        const total = yield userModel_1.default.countDocuments();
        res.json({
            users,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
// ✅ GET - User by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!mongodb_1.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = yield userModel_1.default.findById(userId).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "Failed to fetch user", error: error.message });
    }
});
exports.getUserById = getUserById;
// ✅ DELETE - User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!mongodb_1.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = yield userModel_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        yield userModel_1.default.findByIdAndDelete(userId);
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
});
exports.deleteUser = deleteUser;
// ✅ PATCH - Update user status
const updateUserStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const userId = req.params.id;
        if (!mongodb_1.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = yield userModel_1.default.findByIdAndUpdate(userId, { status }, { new: true }).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (error) {
        console.error("Error updating user status:", error);
        res.status(500).json({ message: "Failed to update user status", error: error.message });
    }
});
exports.updateUserStatus = updateUserStatus;
// ✅ PATCH - Toggle user status
const toggleUserStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!mongodb_1.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = yield userModel_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        user.status = user.status === "active" ? "inactive" : "active";
        yield user.save();
        res.json({
            message: "User status updated",
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            status: user.status,
        });
    }
    catch (error) {
        console.error("Error toggling user status:", error);
        res.status(500).json({ message: "Failed to toggle user status", error: error.message });
    }
});
exports.toggleUserStatus = toggleUserStatus;
