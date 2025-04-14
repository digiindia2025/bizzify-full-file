import express from "express";
import { getAllEnquiries, createEnquiry } from "../../controllers/admin/enquiryController";

const router = express.Router();

router.get("/", getAllEnquiries);
router.post("/", createEnquiry);

export default router;
