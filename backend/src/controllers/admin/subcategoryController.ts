import { Request, Response } from "express";

export const createSubcategoryController = async (req: Request, res: Response) => {
  try {
    // logic to create subcategory
    res.status(201).json({ message: "Subcategory created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
