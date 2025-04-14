import express from "express";
import multer from "multer";
import {
  createSubcategory,
  getAllSubcategories,
  updateSubcategoryById,
  deleteSubcategoryById,
} from "../../controllers/admin/subcategoryController";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), createSubcategory);
router.get("/", getAllSubcategories);
router.put("/:id", upload.single("image"), updateSubcategoryById);
router.delete("/:id", deleteSubcategoryById);

export default router;
