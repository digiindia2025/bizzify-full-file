import { Request, Response } from "express";
import Business from "../../models/businessModel";

// Handler for Business Categories form
export const createBusinessCategory = async (req: Request, res: Response) => {
  try {
    const { businessCategory } = req.body;
    const newCategory = new BusinessCategory({ businessCategory });
    await newCategory.save();
    res.status(201).json({ message: "Business Category saved", data: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error saving category", error: error.message });
  }
};

// Handler for Business Details form
export const createBusinessDetails = async (req: Request, res: Response) => {
  try {
    const { businessDetails } = req.body;
    const newBusinessDetails = new BusinessDetails({ businessDetails });
    await newBusinessDetails.save();
    res.status(201).json({ message: "Business Details saved", data: newBusinessDetails });
  } catch (error) {
    res.status(500).json({ message: "Error saving details", error: error.message });
  }
};

// Handler for Business Timing form
export const createBusinessTiming = async (req: Request, res: Response) => {
  try {
    const { businessTiming } = req.body;
    const newTiming = new BusinessTiming({ businessTiming });
    await newTiming.save();
    res.status(201).json({ message: "Business Timing saved", data: newTiming });
  } catch (error) {
    res.status(500).json({ message: "Error saving timing", error: error.message });
  }
};

// Handler for Contact form
export const createBusinessContact = async (req: Request, res: Response) => {
  try {
    const { contactPerson } = req.body;
    const newContact = new Contact({ contactPerson });
    await newContact.save();
    res.status(201).json({ message: "Contact saved", data: newContact });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact", error: error.message });
  }
};

// Handler for Upgrade Listing form
export const createUpgradeListing = async (req: Request, res: Response) => {
  try {
    const { upgradeListing } = req.body;
    const newUpgrade = new UpgradeListing({ upgradeListing });
    await newUpgrade.save();
    res.status(201).json({ message: "Upgrade Listing saved", data: newUpgrade });
  } catch (error) {
    res.status(500).json({ message: "Error saving upgrade", error: error.message });
  }
};
