import express from "express";
import multer from "multer";
import {
  createCategory,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById,
} from "../../controllers/admin/categoryController";

const router = express.Router();

// Setup Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// @route   POST /api/categories
// @desc    Create a new category with icon upload
router.post("/categories", upload.single("icon"), createCategory);

// @route   GET /api/categories
// @desc    Get all categories
router.get("/categories", getAllCategories);

// @route   PUT /api/categories/:id
// @desc    Update a category by ID
router.put("/categories/:id", upload.single("icon"), updateCategoryById);

router.delete("/categories/:id", deleteCategoryById); // ✅ Delete route

export default router;
