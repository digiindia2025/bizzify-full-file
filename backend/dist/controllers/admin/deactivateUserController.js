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
exports.deleteUser = exports.createUser = exports.getDeactivatedUsers = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
// GET all users with status "Deactivated"
const getDeactivatedUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({ status: "Deactivated" });
        if (!users.length) {
            return res.status(404).json({ message: "No deactivated users found" });
        }
        return res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching deactivated users:", error);
        return res.status(500).json({ message: "Failed to fetch deactivated users" });
    }
});
exports.getDeactivatedUsers = getDeactivatedUsers;
// CREATE a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, status } = req.body;
        // Basic validation
        if (!name || !email || !phone || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check for existing user
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }
        const newUser = yield userModel_1.default.create({ name, email, phone, status });
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Failed to create user" });
    }
});
exports.createUser = createUser;
// DELETE a user by ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        yield user.deleteOne(); // cleaner than findByIdAndDelete when you already have the doc
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Failed to delete user" });
    }
});
exports.deleteUser = deleteUser;
