import { Request, Response } from "express";
import BusinessDetails from "../../models/businessDetailsModel";

export const createBusinessDetails = async (req: Request, res: Response) => {
  try {
    const data = new BusinessDetails(req.body);
    await data.save();
    res.status(201).json({ message: "Business details saved successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to save business details", error });
  }
};
