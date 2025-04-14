import { Request, Response } from "express";
import Subcategory from "../../models/Subcategory";

export const createSubcategory = async (req: Request, res: Response) => {
  try {
    const { name, category, status } = req.body;
    const image = req.file?.filename;

    const subcategory = new Subcategory({ name, category, status, image });
    await subcategory.save();

    res.status(201).json({ message: "Subcategory created", subcategory });
  } catch (err) {
    res.status(500).json({ message: "Error creating subcategory", error: err });
  }
};

export const getAllSubcategories = async (_req: Request, res: Response) => {
  try {
    const subcategories = await Subcategory.find();
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateSubcategoryById = async (req: Request, res: Response) => {
  try {
    const { name, category, status } = req.body;
    const image = req.file?.filename;

    const updated = await Subcategory.findByIdAndUpdate(
      req.params.id,
      { name, category, status, ...(image && { image }) },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteSubcategoryById = async (req: Request, res: Response) => {
  try {
    await Subcategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Subcategory deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
