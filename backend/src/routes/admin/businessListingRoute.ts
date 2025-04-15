import express from "express";
import { createBusinessListing } from "../../controllers/admin/businessListingController";
import multer from "multer";
import path from "path";

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define the folder for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to avoid file name collisions
  },
});
const upload = multer({ storage });

const router = express.Router();

// Define route for creating business listings (with image upload support)
router.post("/business-listing", upload.array("images"), createBusinessListing);

export default router;
