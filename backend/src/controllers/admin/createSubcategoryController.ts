import { Request, Response } from "express";
import Subcategory from "../../models/Subcategory";

export const createSubcategory = async (req: Request, res: Response) => {
  try {
    const { name, category } = req.body;
    const image = req.file?.filename;

    if (!name || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSubcategory = new Subcategory({
      name,
      category,
      image,
    });

    await newSubcategory.save();

    res.status(201).json({ message: "Subcategory created successfully", subcategory: newSubcategory });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
