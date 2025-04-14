import { Request, Response } from "express";
import BusinessDetails from "../../models/businessDetailsModel";
import BusinessTimings from "../../models/BusinessTiming";
import mongoose from "mongoose";
// import BusinessCategories from "../../models/bussi";
import ContactPerson from "../../models/ContactPerson";
import UpgradeListing from "../../models/businessUpgradeModel";
import Business from "../../models/businessDetailsModel";

export const getAllBusinessListings = async (req: Request, res: Response) => {
  try {
    const businessDetails = await BusinessDetails.find();

    const listingsWithFullData = await Promise.all(
      businessDetails.map(async (detail) => {
        const businessId = detail._id;

        const timings = await BusinessTimings.findOne({ businessId });
        // const categories = await BusinessCategories.findOne({ businessId });
        const contact = await ContactPerson.findOne({ businessId });
        const upgrade = await UpgradeListing.findOne({ businessId });

        return {
          businessId,
          businessDetails: detail,
          timings,
        //   categories,
          contact,
          upgrade,
        };
      })
    );

    res.status(200).json(listingsWithFullData);
  } catch (error) {
    console.error("Error fetching full listings", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Controller function to get a single business listing by ID
export const getBusinessListingById = async (req: Request, res: Response) => {
    try {
      const listingId = req.params.id;
  
      // Check if the ID is a valid ObjectId (for MongoDB/Mongoose)
      if (!mongoose.Types.ObjectId.isValid(listingId)) {
        return res.status(400).json({ message: 'Invalid Business Listing ID format' });
      }
  
      const listing = await Business.findById(listingId).populate('user');
  
      if (listing) {
        res.status(200).json(listing);
      } else {
        res.status(404).json({ message: `Business listing with ID ${listingId} not found` });
      }
    } catch (error: any) {
      console.error(`Error fetching business listing with ID ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch business listing" });
    }
  };