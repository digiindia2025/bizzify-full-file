import mongoose, { Schema, Document } from "mongoose";

export interface IBusinessListing extends Document {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  subcategory: string;
  businessStatus: string; // e.g. Approved, Pending, Rejected
  trustStatus: string;    // e.g. Approved, Not Approved
  publishStatus: string;  // e.g. Published, Unpublished
  publishedDate?: Date;
  createdAt: Date;
}

const BusinessListingSchema: Schema = new Schema(
  {
    businessName: { type: String, required: true },
    ownerName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    category: { type: String },
    subcategory: { type: String },

    businessStatus: { type: String, default: "Pending" },
    trustStatus: { type: String, default: "Not Approved" },
    publishStatus: { type: String, default: "Unpublished" },
    publishedDate: { type: Date },

  },
  { timestamps: true }
);

export default mongoose.model<IBusinessListing>(
  "BusinessListing",
  BusinessListingSchema
);
