import { Request, Response } from "express";
import Enquiry from "../../models/enquiryModel";

// GET all enquiries
export const getAllEnquiries = async (req: Request, res: Response) => {
  try {
    const enquiries = await Enquiry.find();
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
};

// POST create a new enquiry
export const createEnquiry = async (req: Request, res: Response) => {
  try {
    const { userName, title, name, requirement } = req.body;
    const newEnquiry = new Enquiry({ userName, title, name, requirement });
    await newEnquiry.save();
    res.status(201).json(newEnquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to create enquiry" });
  }
};
