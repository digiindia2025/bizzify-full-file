import { Request, Response } from "express";
import BusinessListing from "../../models/BusinessListing";
import path from "path";

export const createBusinessListing = async (req: Request, res: Response) => {
  try {
    // Check if all required fields are present
    const { category, subcategories, about } = req.body;

    if (!category || !subcategories || subcategories.length === 0 || !about) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Save images
    const imageUrls = req.files ? (req.files as Express.Multer.File[]).map((file) => `/uploads/${file.filename}`) : [];

    const newBusinessListing = new BusinessListing({
      category,
      subcategories,
      about,
      images: imageUrls,
    });

    await newBusinessListing.save();

    res.status(201).json({ message: "Business listing created successfully", data: newBusinessListing });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
