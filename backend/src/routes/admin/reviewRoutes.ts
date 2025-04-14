import express from "express";
import { getAllReviews, approveReview, createReview } from "../../controllers/admin/reviewController";

const router = express.Router();

router.get("/", getAllReviews);
router.patch("/:id/approve", approveReview);
router.post("/", createReview); // Optional

export default router;
