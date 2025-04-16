import { Request, Response } from "express";
import SubcategoryModel from "../../models/Subcategory";

// Get all subcategories with pagination
export const getSubcategories = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const total = await SubcategoryModel.countDocuments(); // Get total count first to calculate totalPages

    const subcategories = await SubcategoryModel.find()
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .exec();

    res.json({
      subcategories,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ message: "Error fetching subcategories", error: (error as Error).message });
  }
};

// Create a new subcategory
export const createSubcategory = async (req: Request, res: Response) => {
  const { name, category, status, imageUrl } = req.body;

  // Input validation
  if (!name || !category || !status) {
    return res.status(400).json({ message: "Name, category, and status are required." });
  }

  try {
    const newSubcategory = new SubcategoryModel({
      name,
      category,
      status,
      imageUrl,
    });

    const savedSubcategory = await newSubcategory.save();
    res.status(201).json(savedSubcategory);
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({ message: "Error creating subcategory", error: (error as Error).message });
  }
};

// Update a subcategory
export const updateSubcategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, status, imageUrl } = req.body;

  // Input validation
  if (!name || !category || !status) {
    return res.status(400).json({ message: "Name, category, and status are required." });
  }

  try {
    const updatedSubcategory = await SubcategoryModel.findByIdAndUpdate(
      id,
      { name, category, status, imageUrl },
      { new: true }
    );
    
    if (!updatedSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json(updatedSubcategory);
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({ message: "Error updating subcategory", error: (error as Error).message });
  }
};

// Delete a subcategory
export const deleteSubcategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedSubcategory = await SubcategoryModel.findByIdAndDelete(id);
    
    if (!deletedSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    res.status(500).json({ message: "Error deleting subcategory", error: (error as Error).message });
  }
};
