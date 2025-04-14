import express from "express";
import multer from "multer";
import path from "path";
import { createChildCategory } from "../../controllers/admin/childCategoryController";

const router = express.Router();

// Setup multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST route to create a child category
router.post("/", upload.single("image"), createChildCategory);

export default router;
