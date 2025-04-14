// controllers/businessTimingController.ts
import { Request, Response } from "express";
import BusinessTiming from "../../models/BusinessTiming";

// Get all business timings
export const getBusinessTimings = async (req: Request, res: Response) => {
  try {
    const timings = await BusinessTiming.find();
    res.status(200).json(timings);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving business timings" });
  }
};

// Add or update business timings
export const setBusinessTimings = async (req: Request, res: Response) => {
  const timings = req.body.timings; // Get timings from the request body

  if (!timings || timings.length === 0) {
    return res.status(400).json({ message: "No timings provided" });
  }

  // Validate timings for each day
  for (let timing of timings) {
    // If the day is open, make sure openTime and closeTime are provided
    if (timing.isOpen) {
      if (!timing.openTime || !timing.closeTime) {
        return res.status(400).json({ message: `Open and Close times are required for ${timing.day}` });
      }
    } else {
      // If the day is closed, make sure timings are not set
      if (timing.openTime || timing.closeTime) {
        return res.status(400).json({ message: `No times should be provided for closed day ${timing.day}` });
      }
    }
  }

  try {
    // Delete existing business timings (optional based on your needs)
    await BusinessTiming.deleteMany();

    // Save new business timings
    const savedTimings = await BusinessTiming.insertMany(timings);

    res.status(201).json(savedTimings);
  } catch (error) {
    res.status(500).json({ message: "Error saving business timings" });
  }
};
