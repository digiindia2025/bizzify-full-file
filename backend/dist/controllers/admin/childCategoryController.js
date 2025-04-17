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
exports.createChildCategory = void 0;
const ChildCategoryModel_1 = __importDefault(require("../../models/ChildCategoryModel"));
const createChildCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { parentCategory, subCategory, childCategoryName } = req.body;
        const image = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
        if (!parentCategory || !subCategory || !childCategoryName) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newChildCategory = new ChildCategoryModel_1.default({
            parentCategory,
            subCategory,
            name: childCategoryName,
            image,
        });
        yield newChildCategory.save();
        res.status(201).json({ message: "Child category created successfully" });
    }
    catch (error) {
        console.error("Error creating child category:", error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.createChildCategory = createChildCategory;
