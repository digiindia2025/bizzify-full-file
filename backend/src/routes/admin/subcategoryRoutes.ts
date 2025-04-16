import express from "express";
import upload from "../../utils/multer";
import { createSubcategoryController } from "../../controllers/admin/subcategoryController";

const router = express.Router();

// ✅ Correct way to apply upload middleware and controller together
router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  createSubcategoryController
);

export default router;
