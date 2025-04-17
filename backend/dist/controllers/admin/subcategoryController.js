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
exports.deleteSubcategoryById = exports.updateSubcategoryById = exports.getAllSubcategories = exports.createSubcategory = void 0;
const Subcategory_1 = __importDefault(require("../../models/Subcategory"));
const createSubcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, category, status } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        const subcategory = new Subcategory_1.default({ name, category, status, image });
        yield subcategory.save();
        res.status(201).json({ message: "Subcategory created", subcategory });
    }
    catch (err) {
        res.status(500).json({ message: "Error creating subcategory", error: err });
    }
});
exports.createSubcategory = createSubcategory;
const getAllSubcategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategories = yield Subcategory_1.default.find();
        res.json(subcategories);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getAllSubcategories = getAllSubcategories;
const updateSubcategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, category, status } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        const updated = yield Subcategory_1.default.findByIdAndUpdate(req.params.id, Object.assign({ name, category, status }, (image && { image })), { new: true });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.updateSubcategoryById = updateSubcategoryById;
const deleteSubcategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Subcategory_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Subcategory deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.deleteSubcategoryById = deleteSubcategoryById;
