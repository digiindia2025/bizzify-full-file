// models/BusinessListing.ts
import mongoose from "mongoose";

const businessListingSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    subcategories: [String],
    about: { type: String, required: true },
    images: [String], // URLs or file paths

     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 👈 ye "User" model ke name se match hona chahiye
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BusinessListing", businessListingSchema);
