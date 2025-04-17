"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const categoryController_1 = require("../../controllers/admin/categoryController");
const router = express_1.default.Router();
// Setup Multer storage
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// @route   POST /api/categories
// @desc    Create a new category with icon upload
router.post("/categories", upload.single("icon"), categoryController_1.createCategory);
// @route   GET /api/categories
// @desc    Get all categories
router.get("/categories", categoryController_1.getAllCategories);
// @route   PUT /api/categories/:id
// @desc    Update a category by ID
router.put("/categories/:id", upload.single("icon"), categoryController_1.updateCategoryById);
router.delete("/categories/:id", categoryController_1.deleteCategoryById); // ✅ Delete route
exports.default = router;
