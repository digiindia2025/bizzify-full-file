import { Request, Response } from "express";
import BusinessListing from "../../models/BusinessListing";

export const createBusinessListing = async (req: Request, res: Response) => {
  try {
    const { category, subcategories, about } = req.body;

    // Validate required fields, without user
    if (!category || !subcategories || subcategories.length === 0 || !about) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Save images (if any)
    const imageUrls = req.files ? (req.files as Express.Multer.File[]).map((file) => `/uploads/${file.filename}`) : [];

    // Create new business listing
    const newBusinessListing = new BusinessListing({
      category,
      subcategories,
      about,
      images: imageUrls,
    });

    // Save the listing to the database
    await newBusinessListing.save();

    res.status(201).json({ message: "Business listing created successfully", data: newBusinessListing });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
