import { Request, Response } from "express";
import BusinessDetails from "../../models/businessDetailsModel"; // Make sure this model exists and is correct

// Controller function to create business details
export const createBusinessDetails = async (req: Request, res: Response) => {
  try {
    const {
      businessName,
      pinCode,
      building,
      street,
      area,
      landmark,
      city,
      state,
      direction,
      website,
      phone,
      categories,
      user, // Should ideally come from authenticated user token
    } = req.body;

    // Check if all required fields are provided
    if (
      !businessName ||
      !pinCode ||
      !building ||
      !street ||
      !area ||
      !city ||
      !state ||
      !phone ||
      !categories ||
      !user
    ) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    // Create a new business details entry
    const newEntry = new BusinessDetails({
      businessName,
      pinCode,
      building,
      street,
      area,
      landmark,
      city,
      state,
      direction,
      website,
      phone,
      categories,
      status: "Unpublished",
      businessStatus: "Active",
      trustStatus: "Not Verified",
      viewCount: 0,
      user,
    });

    // Save the new entry to the database
    const saved = await newEntry.save();

    // Return a success response
    res.status(201).json({
      message: "Business details saved successfully",
      data: saved,
    });
  } catch (error) {
    console.error("Error saving business details:", error);

    // Return an error response if there was an issue
    res.status(500).json({
      message: "Server Error",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
