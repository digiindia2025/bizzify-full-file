import { Request, Response } from "express";
import Contact from "../../models/Contact";
import BusinessDetails from "../../models/BusinessDetails";
import BusinessCategory from "../../models/BusinessCategory";
import BusinessTiming from "../../models/BusinessTiming";
import UpgradeListing from "../../models/UpgradeListing";
import BusinessListing from "../../models/BusinessListing";

// Step 1: Create Contact
export const createContact = async (req: Request, res: Response) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact saved", data: contact });
  } catch (err) {
    console.error("Contact Save Error:", err);
    res.status(500).json({ message: "Failed to save contact", error: err });
  }
};

// Step 2: Create Business Details
export const createBusinessDetails = async (req: Request, res: Response) => {
    try {
      const businessDetails = new BusinessDetails(req.body);
      const savedDetails = await businessDetails.save();
      res.status(201).json({
        message: "Business details saved successfully",
        data: savedDetails,
      });
    } catch (error) {
      console.error("Error saving business details:", error);
      res.status(500).json({ message: "Failed to save business details", error });
    }
  };

// Step 3: Create Business Category
export const createBusinessCategory = async (req: Request, res: Response) => {
    try {
      const { category, businessImages, about, keywords, serviceArea } = req.body;
  
      if (!category || !businessImages || !about) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const newCategory = new BusinessCategory({
        category,
        businessImages,
        about,
        keywords,
        serviceArea,
      });
  
      await newCategory.save();
      res.status(201).json({ message: "Business category created successfully!" });
  
    } catch (error) {
      console.error("Error creating business category:", error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: "Validation Error", error: error.message });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

// Step 4: Create Business Timing
export const createBusinessTiming = async (req: Request, res: Response) => {
    try {
      const { timings } = req.body;
  
      if (!Array.isArray(timings) || timings.length === 0) {
        return res
          .status(400)
          .json({ error: "Timings data must be a non-empty array" });
      }
  
      for (const timing of timings) {
        const { day, openTime, closeTime } = timing;
        if (!day || !openTime || !closeTime) {
          return res
            .status(400)
            .json({ error: `Missing required fields for ${day || "a day"}` });
        }
      }
  
      // TODO: Save to DB if needed
  
      return res.status(200).json({ message: "Timings saved successfully" });
    } catch (error) {
      console.error("Error saving timings:", error);
      return res.status(500).json({ error: "Server error" });
    }
  };
  
// Step 5: Create Upgrade Listing
export const createUpgradeListing = async (req: Request, res: Response) => {
  try {
    const upgrade = new UpgradeListing(req.body);
    await upgrade.save();
    res.status(201).json({ message: "Upgrade listing saved", data: upgrade });
  } catch (err) {
    console.error("UpgradeListing Save Error:", err);
    res.status(500).json({ message: "Failed to save upgrade listing", error: err });
  }
};

// Step 6: Create Full Business Listing (Optional Combined Entry)
export const createBusinessListing = async (req: Request, res: Response) => {
  try {
    const listing = new BusinessListing(req.body);
    await listing.save();
    res.status(201).json({ message: "Full business listing saved", data: listing });
  } catch (err) {
    console.error("BusinessListing Save Error:", err);
    res.status(500).json({ message: "Failed to save full business listing", error: err });
  }
};
