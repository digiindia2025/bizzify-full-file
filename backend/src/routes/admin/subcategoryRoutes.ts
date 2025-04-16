import { Router } from "express";
import {
  getSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../../controllers/admin/subcategoryController";

const router = Router();

router.get("/subcategories", getSubcategories); // Get all subcategories
router.post("/subcategories", createSubcategory); // Create new subcategory
router.put("/subcategories/:id", updateSubcategory); // Update subcategory
router.delete("/subcategories/:id", deleteSubcategory); // Delete subcategory

export default router;
