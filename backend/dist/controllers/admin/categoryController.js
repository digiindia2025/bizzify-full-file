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
exports.deleteCategoryById = exports.updateCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../../models/Category"));
// Create new category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const icon = req.file ? req.file.filename : "";
        const newCategory = new Category_1.default({ name, icon });
        yield newCategory.save();
        res.status(201).json(newCategory);
    }
    catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Failed to create category" });
    }
});
exports.createCategory = createCategory;
// Get all categories
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find();
        res.status(200).json(categories);
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Failed to get categories" });
    }
});
exports.getAllCategories = getAllCategories;
// Update category by ID
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const icon = req.file ? req.file.filename : undefined;
        const updateData = { name };
        if (icon)
            updateData.icon = icon;
        const updatedCategory = yield Category_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Failed to update category" });
    }
});
exports.updateCategoryById = updateCategoryById;
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedCategory = yield Category_1.default.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Failed to delete category" });
    }
});
exports.deleteCategoryById = deleteCategoryById;
