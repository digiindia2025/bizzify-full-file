import express from "express";
import multer from "multer";
import path from "path";
import { createBusinessListing } from "../../controllers/admin/businessListingController";

// Setup Multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = express.Router();

// Post route to create a new business listing
router.post("/business-listing", upload.array("images"), createBusinessListing);

export default router;
