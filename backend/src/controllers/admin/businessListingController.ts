import { Request, Response } from "express";
import Contact from "../../models/Contact";
import BusinessDetails from "../../models/BusinessDetails";
import BusinessCategory from "../../models/BusinessCategory";
import BusinessTiming from "../../models/BusinessTiming";
import UpgradeListing from "../../models/UpgradeListing";
import BusinessListing from "../../models/BusinessListing";
import { fs } from "fs";
import path from "path";

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

// // Step 2: Create Business Details
// export const createBusinessDetails = async (req: Request, res: Response) => {
//     try {
//       const businessDetails = new BusinessDetails(req.body);
//       const savedDetails = await businessDetails.save();
//       res.status(201).json({
//         message: "Business details saved successfully",
//         data: savedDetails,
//       });
//     } catch (error) {
//       console.error("Error saving business details:", error);
//       res.status(500).json({ message: "Failed to save business details", error });
//     }
//   };

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
export const createBusinessTiming = async (req, res) => {
  try {
    const { timings } = req.body;

    // Validate if timings array is provided and is not empty
    if (!timings || timings.length === 0) {
      return res.status(400).json({ message: "Timings data is required." });
    }

    // Validate that every day has openTime and closeTime if 'isOpen' is true
    const invalidTimings = timings.some(item =>
      item.isOpen && (!item.openTime || !item.closeTime)
    );

    if (invalidTimings) {
      return res.status(400).json({ message: "Please fill in all timings for selected days." });
    }

    // Save business timings (pseudo code, adjust according to your database logic)
    const savedTimings = await BusinessTiming.create(timings);

    res.status(201).json({ message: "Timings saved successfully", data: savedTimings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Step 5: Create Upgrade Listing
export const createUpgradeListing = async (req: Request, res: Response) => {
  const { direction, website, facebook, instagram, linkedin, twitter } = req.body;

  // Validate the required fields
  if (!direction || !website) {
    return res.status(400).json({ message: "Direction and Website are required" });
  }

  try {
    // Create a new UpgradeListing instance
    const upgrade = new UpgradeListing({
      direction,
      website,
      facebook,
      instagram,
      linkedin,
      twitter,
    });

    // Save the upgrade listing to the database
    await upgrade.save();

    // Send a success response with the saved data
    res.status(201).json({
      message: "Upgrade listing saved successfully",
      data: upgrade,
    });
  } catch (err) {
    console.error("Error saving upgrade listing:", err);
    res.status(500).json({
      message: "Failed to save upgrade listing",
      error: "Internal Server Error",
    });
  }
};

<<<<<<< HEAD
// import { Request, Response } from "express";

// export const upgradeListing = async (req: Request, res: Response) => {
//     const { listingId, upgradeType, duration } = req.body;

//     if (!listingId || !upgradeType || !duration) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

// try {
// Your logic to update listing's upgrade info in DB
// Example: await ListingModel.findByIdAndUpdate(...)

//       return res.status(200).json({ message: "Listing upgraded successfully" });
//     } catch (error) {
//       console.error("Error upgrading listing:", error);
//       return res.status(500).json({ error: "Server error" });
//     }
//   };

=======
>>>>>>> 18fce7f081eb8090d02f9e9644b59419ff0bf379
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

// ✅ Step 7: Get All Full Business Listings (merged from 5 forms)
export const getAllFullListings = async (req: Request, res: Response) => {
  try {
    const businessDetails = await BusinessDetails.find();
    const contacts = await Contact.find();
    const categories = await BusinessCategory.find();
    const timings = await BusinessTiming.find();
    const upgrades = await UpgradeListing.find();

<<<<<<< HEAD
    const listings = businessDetails.map((detail, index) => ({
      businessDetails: detail,
      contactPerson: contacts[index],
      categories: categories[index],
      timings: timings[index],
      upgrade: upgrades[index]
    }));

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Step 8: Delete Business Listing by ID
// export const deleteBusinessListing = async (req: Request, res: Response) => {
//   const { id } = req.params; // Get the ID from URL parameters
//   console.log(`Deleting business listing with ID: ${id}`); // Log the ID being received

//   try {
//     // Find the listing by ID and delete it
//     const deletedListing = await BusinessListing.findByIdAndDelete(id);

//     if (!deletedListing) {
//       return res.status(404).json({ message: "Business listing not found" });
//     }

//     res.status(200).json({ message: "Business listing deleted successfully", data: deletedListing });
//   } catch (err) {
//     console.error("Error deleting business listing:", err);
//     res.status(500).json({ message: "Failed to delete business listing", error: err });
//   }
// };

// Step 9: Update Business Listing by ID
export const updateBusinessStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const listing = await BusinessListing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Directly update fields in BusinessListing
    listing.businessStatus = status;
    listing.trustStatus =
      status === "Approved" || status === "Pending" ? "Approved" : "Not Approved";

    await listing.save();

    res.status(200).json({ message: "Business status updated successfully", listing });
  } catch (error) {
    console.error("Error updating business status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 11 update public status
export const updatePublishStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const listing = await BusinessListing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
=======
  // Step 8: Delete Business Listing by ID
  export const deleteBusinessListing = async (req: Request, res: Response) => {
  const { id } = req.params; // Get the ID from URL parameters
  console.log(`Attempting to delete business listing with ID: ${id}`); // Log the ID being received

  // Check if ID is provided
  if (!id) {
    return res.status(400).json({ message: "Listing ID is required" });
  }

  try {
    // Find the listing by ID and delete it
    const deletedListing = await BusinessListing.findByIdAndDelete(id);

    if (!deletedListing) {
      return res.status(404).json({ message: "Business listing not found" });
    }

    // Successfully deleted the listing
    return res.status(200).json({
      message: "Business listing deleted successfully",
      data: deletedListing,
    });
  } catch (err) {
    console.error("Error deleting business listing:", err);
    return res.status(500).json({
      message: "Failed to delete business listing",
      error: err.message || err,
    });
  }
};
  
  // Step 9: Update Business Listing by ID
  export const updateBusinessStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const listing = await BusinessListing.findById(id);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
  
      // Directly update fields in BusinessListing
      listing.businessStatus = status;
      listing.trustStatus =
        status === "Approved" || status === "Pending" ? "Approved" : "Not Approved";
  
      await listing.save();
  
      res.status(200).json({ message: "Business status updated successfully", listing });
    } catch (error) {
      console.error("Error updating business status:", error);
      res.status(500).json({ message: "Server error" });
>>>>>>> 18fce7f081eb8090d02f9e9644b59419ff0bf379
    }

    listing.publishedDate = status;

    await listing.save();

    res.status(200).json({ message: "Publish status updated successfully", listing });
  } catch (error) {
    console.error("Error updating publish status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//   10 view details by id 

export const getBusinessListingDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Find the main listing by ID
    const listing = await BusinessListing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Business listing not found" });
    }

    // Find related records (assuming they are stored separately)
    const businessDetails = await BusinessDetails.findOne({ listingId: id });
    const contact = await Contact.findOne({ listingId: id });
    const category = await BusinessCategory.findOne({ listingId: id });
    const timing = await BusinessTiming.findOne({ listingId: id });
    const upgrade = await UpgradeListing.findOne({ listingId: id });

    return res.status(200).json({
      message: "Business listing details fetched successfully",
      data: {
        listing,
        businessDetails,
        contact,
        category,
        timing,
        upgrade,
      },
    });
  } catch (error) {
    console.error("Error fetching business listing details:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

//////////////////////////////////AASIB KHAN////////////////////////////////////////////////////////////////////////////

export const createBusinessDetails = async (req: Request, res: Response) => {
  try {
    const { contactPerson, businessDetails, businessTiming, businessCategory, upgradeListing, } = req.body;

    const listing = new BusinessListing({
      contactPerson: JSON.parse(contactPerson),
      businessDetails: JSON.parse(businessDetails),
      businessTiming: JSON.parse(businessTiming),
      businessCategory: JSON.parse(businessCategory),
      upgradeListing: JSON.parse(upgradeListing),
    });

    await listing.save();
    res.status(201).json({ message: "Listing created", status: true, data: listing });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const listings = await BusinessListing.find();
    res.status(200).json({ status: true, message: "Listings fetched successfully", data: listings });
  } catch (err) {
    res.status(500).json({ message: "Error fetching listings", error: err.message });
  }
};

export const getAllListingsById = async (req: Request, res: Response) => {
  try {
    const listing = await BusinessListing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ data: listing, status: true, message: "Listing fetched successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error fetching", error: err.message });
  }
};

export const updateAllListingsById = async (req: Request, res: Response) => {
  try {
    const updated = await BusinessListing.findByIdAndUpdate(
      req.params.id,
      {
        contactPerson: JSON.parse(req.body.contactPerson),
        businessDetails: JSON.parse(req.body.businessDetails),
        businessTiming: JSON.parse(req.body.businessTiming),
        businessCategory: JSON.parse(req.body.businessCategory),
        upgradeListing: JSON.parse(req.body.upgradeListing),
      },
      { new: true }
    );
    res.json({ message: "Listing updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Update error", error: err.message });
  }
};

export const deleteBusinessListing = async (req: Request, res: Response) => {
  try {
    const listing = await BusinessListing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    // Delete all business images if they exist
    const images: string[] = listing.businessCategory?.businessImages || [];

    images.forEach((img) => {
      const filePath = path.join(__dirname, `/uploads/${img}`);
      console.log("HHHHHHHH",filePath)
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (fileErr) {
        console.error("Error deleting file:", fileErr);
      }
    });

    // Delete the listing from DB
    await BusinessListing.findByIdAndDelete(req.params.id);

    res.status(200).json({ status: true, message: "Listing deleted", data: listing });

  } catch (err: any) {
    res.status(500).json({ message: "Delete error", error: err.message });
  }
};

