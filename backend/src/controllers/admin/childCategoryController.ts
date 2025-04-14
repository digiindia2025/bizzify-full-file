// src/controllers/admin/childCategoryController.ts
import { Request, Response } from "express";
import ChildCategory from "../../models/ChildCategoryModel";

export const createChildCategory = async (req: Request, res: Response) => {
  try {
    const { parentCategory, subCategory, childCategoryName } = req.body;
    const image = req.file?.filename || "";

    if (!parentCategory || !subCategory || !childCategoryName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newChildCategory = new ChildCategory({
      parentCategory,
      subCategory,
      name: childCategoryName,
      image,
    });

    await newChildCategory.save();

    res.status(201).json({ message: "Child category created successfully" });
  } catch (error) {
    console.error("Error creating child category:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
