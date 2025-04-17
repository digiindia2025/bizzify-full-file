"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const advertisementController_1 = require("../../controllers/admin/advertisementController");
const router = express_1.default.Router();
// Setup multer for image uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../../../uploads")); // ✅ Ensure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = (0, multer_1.default)({ storage });
// Routes
router.post("/", upload.single("image"), advertisementController_1.createAdvertisement); // Create new ad with image
router.get("/", advertisementController_1.getAllAdvertisements); // Get all ads
router.get("/:id", advertisementController_1.getAdvertisementById); // Get ad by ID
router.put("/:id", upload.single("image"), advertisementController_1.updateAdvertisement); // Update ad with new image (optional)
router.delete("/:id", advertisementController_1.deleteAdvertisement); // Delete ad
exports.default = router;
