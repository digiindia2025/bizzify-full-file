// utils/multerSetup.ts
import multer from "multer";
import path from "path";

// Define storage settings for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtension}`;
    cb(null, fileName); // Name the file with a unique timestamp
  },
});

// Initialize multer with storage settings
const upload = multer({ storage });

export default upload;
