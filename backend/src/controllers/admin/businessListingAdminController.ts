import { Request, Response } from "express";
import BusinessDetails from "../../models/businessDetailsModel";
import BusinessTimings from "../../models/BusinessTiming";
import mongoose from "mongoose";
import BusinessCategories from "../../models/BusinessCategories";
import ContactPerson from "../../models/ContactPerson";
import UpgradeListing from "../../models/businessUpgradeModel";
import Business from "../../models/businessDetailsModel";



// Controller function to get all business listings with full data

export const getAllBusinessListings = async (req: Request, res: Response) => {
  try {
    // Fetch all business details

    const businessDetails = await BusinessDetails.find();

    // Use Promise.all to fetch related data (timings, categories, contact, upgrade) concurrently

    const listingsWithFullData = await Promise.all(
      businessDetails.map(async (detail) => {
        const businessId = detail._id;

        // Fetch related data concurrently using Promise.all

        const [timings, categories, contact, upgrade] = await Promise.all([
          BusinessTimings.findOne({ businessId }),  // Get business timings
          BusinessCategories.findOne({ businessId }), // Get business categories (added back)
          ContactPerson.findOne({ businessId }), // Get contact person
          UpgradeListing.findOne({ businessId }), // Get upgrade listing
        ]);


        return {
          businessId,
          businessDetails: detail,
          timings,
          categories,
          contact,
          upgrade,
        };
        
      })
    );

    // Return the full listings with related data

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

      // Fetch the business listing by ID and populate the 'user' field
  
      const listing = await Business.findById(listingId).populate('user');
  
      // / If the listing is found, return it
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



  // 

  