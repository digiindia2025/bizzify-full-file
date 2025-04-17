"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const subcategoryController_1 = require("../../controllers/admin/subcategoryController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.post("/", upload.single("image"), subcategoryController_1.createSubcategory);
router.get("/", subcategoryController_1.getAllSubcategories);
router.put("/:id", upload.single("image"), subcategoryController_1.updateSubcategoryById);
router.delete("/:id", subcategoryController_1.deleteSubcategoryById);
exports.default = router;
