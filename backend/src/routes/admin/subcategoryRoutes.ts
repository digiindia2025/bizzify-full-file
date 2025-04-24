import express from "express";
import { createSubcategory, getAllSubcategories } from "../../controllers/admin/subcategoryController";
import { upload } from "../../middleware/upload";

const router = express.Router();

const uploadFields = [
  { name: "image", maxCount: 1 },
  { name: "banner", maxCount: 1 },
];

for (let i = 0; i < 10; i++) {
  uploadFields.push({ name: `mainSubCategories[${i}][banner]`, maxCount: 1 });
}

router.post("/subcategories", upload.fields(uploadFields), createSubcategory);
router.get("/subcategories", getAllSubcategories);

export default router;
