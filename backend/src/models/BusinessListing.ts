import mongoose, { Schema, Document } from "mongoose";

interface IBusinessListing extends Document {
  category: string;
  subcategories: string[];
  about: string;
  images: string[];
  // user: string; // Assuming user is a string (ID of the user creating the listing)
}

const BusinessListingSchema: Schema = new Schema(
  {
    category: { type: String, required: true },
    subcategories: [{ type: String, required: true }],
    about: { type: String, required: true },
    images: [{ type: String }],
    // user: { type: String, required: true }, // Assuming the user ID is a string
  },
  { timestamps: true }
);

export default mongoose.model<IBusinessListing>("BusinessListing", BusinessListingSchema);
