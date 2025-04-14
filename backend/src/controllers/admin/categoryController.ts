import { Request, Response } from "express";
import Category from "../../models/Category";

// Create new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const icon = req.file ? req.file.filename : "";

    const newCategory = new Category({ name, icon });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
};

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to get categories" });
  }
};

// Update category by ID
export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const icon = req.file ? req.file.filename : undefined;

    const updateData: any = { name };
    if (icon) updateData.icon = icon;

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};



export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};
