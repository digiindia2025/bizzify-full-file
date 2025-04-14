import { Request, Response } from "express";
import Review from "../../models/reviewModel";

export const getAllReviews = async (_: Request, res: Response) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

export const approveReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndUpdate(id, { approved: true }, { new: true });
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json({ message: "Review approved", review });
  } catch (err) {
    res.status(500).json({ error: "Failed to approve review" });
  }
};

// Optional: Create review (for testing)
export const createReview = async (req: Request, res: Response) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err: any) {
    console.error("Create Review Error:", err.message, err);
    res.status(500).json({ error: "Failed to create review" });
  }
};

