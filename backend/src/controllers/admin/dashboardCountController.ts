import { Request, Response } from "express";
import Listing from "../../models/listingModel";
import Advertisement from "../../models/Advertisement";
import User from "../../models/User";
import Category from "../../models/Category";
import Subcategory from "../../models/Subcategory";
import ChildCategory from "../../models/ChildCategoryModel";
import Contact from "../../models/Contact";
// import SupportTicket from "../../models/SupportTicket";
// import Enquiry from "../../models/Enquiry";
// import LinkModel from "../../models/Link";
// import Review from "../../models/Review";
// import Membership from "../../models/Membership";

export const getDashboardCounts = async (req: Request, res: Response) => {
  try {
    const [
      listings,
      advertisements,
      users,
      categories,
      subcategories,
      childCategories,
      contacts,
      supports,
      enquiries,
      links,
      reviews,
      memberships,
    ] = await Promise.all([
      Listing.countDocuments(),
      Advertisement.countDocuments(),
      User.countDocuments(),
      Category.countDocuments(),
      Subcategory.countDocuments(),
      ChildCategory.countDocuments(),
      Contact.countDocuments(),
    //   SupportTicket.countDocuments(),
    //   Enquiry.countDocuments(),
    //   LinkModel.countDocuments(),
    //   Review.countDocuments(),
    //   Membership.countDocuments(),
    ]);

    res.json({
      listings,
      advertisements,
      users,
      categories,
      subcategories,
      childCategories,
      contacts,
      supports,
      enquiries,
      links,
      reviews,
      memberships,
    });
  } catch (err) {
    console.error("Error fetching dashboard counts:", err);
    res.status(500).json({ message: "Failed to get dashboard counts" });
  }
};
