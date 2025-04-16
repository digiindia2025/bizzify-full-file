// controller/admin/listingController.ts
import { Request, Response } from "express";
import Listing from "../../models/listingModel"; // Adjust path if needed

// ✅ GET: Fetch all listings with pagination
export const getAllListingsController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const listings = await Listing.find().skip(skip).limit(limit);
    const total = await Listing.countDocuments();

    res.status(200).json({ listings, total });
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Error fetching listings", error });
  }
};

// ✅ PATCH: Update a specific listing (status, publishedDate, etc.)  
export const updateListingController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const listing = await Listing.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({ message: "Listing updated successfully", listing });
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ message: "Error updating listing", error });
  }
};


// ✅ DELETE: Delete a specific listing
// listingController.ts
// controller/admin/deleteListingController.ts
export const deleteListingController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Listing.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Listing not found" });
    }

    return res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



// ✅ POST: Bulk action (e.g., approve/reject/publish multiple listings)
export const bulkActionListingController = async (req: Request, res: Response) => {
  try {
    const { ids, action } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid IDs" });
    }

    let update = {};

    if (action === "Approve") {
      update = {
        status: "Approved",
        businessStatus: "Approved",
        trustStatus: "Approved",
      };
    } else if (action === "Reject") {
      update = {
        status: "Rejected",
        businessStatus: "Not Approved",
        trustStatus: "Not Approved",
      };
    } else if (action === "Publish") {
      update = { publishedDate: "Published" };
    } else if (action === "Unpublish") {
      update = { publishedDate: "Unpublished" };
    }

    await Listing.updateMany({ _id: { $in: ids } }, update);

    res.status(200).json({ message: `Listings ${action}d successfully.` });
  } catch (error) {
    console.error("Bulk action failed:", error);
    res.status(500).json({ message: "Bulk action failed", error });
  }
};


export const createListingController = async (req: Request, res: Response) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json({ message: "Listing created successfully", listing });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: "Error creating listing", error });
  }
};
