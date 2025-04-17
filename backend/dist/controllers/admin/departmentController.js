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
exports.updateDepartment = exports.deleteDepartment = exports.createDepartment = exports.getAllDepartments = void 0;
const departmentModel_1 = __importDefault(require("../../models/departmentModel"));
// Get all departments
const getAllDepartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield departmentModel_1.default.find().sort({ createdAt: -1 });
        res.json(departments);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch departments", error });
    }
});
exports.getAllDepartments = getAllDepartments;
// Create a new department
const createDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { department, status } = req.body;
        if (!department) {
            return res.status(400).json({ message: "Department name is required" });
        }
        const newDept = new departmentModel_1.default({ department, status });
        const saved = yield newDept.save();
        res.status(201).json(saved);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create department", error });
    }
});
exports.createDepartment = createDepartment;
// Delete a department
const deleteDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield departmentModel_1.default.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.json({ message: "Department deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete department", error });
    }
});
exports.deleteDepartment = deleteDepartment;
// Update department status or name
const updateDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { department, status } = req.body;
        const updated = yield departmentModel_1.default.findByIdAndUpdate(id, { department, status }, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update department", error });
    }
});
exports.updateDepartment = updateDepartment;
