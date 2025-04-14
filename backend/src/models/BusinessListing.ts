// models/BusinessListing.ts
import mongoose from "mongoose";

const businessListingSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    subcategories: [String],
    about: { type: String, required: true },
    images: [String], // URLs or file paths
  },
  { timestamps: true }
);

export default mongoose.model("BusinessListing", businessListingSchema);
