// import mongoose, { Schema, Document } from "mongoose";

// export interface IBusinessListing extends Document {
//   businessName: string;
//   ownerName: string;
//   email: string;
//   phone: string;
//   address: string;
//   category: string;
//   subcategory: string;
//   businessStatus: string; // e.g. Approved, Pending, Rejected
//   trustStatus: string;    // e.g. Approved, Not Approved
//   publishStatus: string;  // e.g. Published, Unpublished
//   publishedDate?: Date;
//   createdAt: Date;
// }

// const BusinessListingSchema: Schema = new Schema(
//   {
//     businessName: { type: String, required: true },
//     ownerName: { type: String },
//     email: { type: String },
//     phone: { type: String },
//     address: { type: String },
//     category: { type: String },
//     subcategory: { type: String },

//     businessStatus: { type: String, default: "Pending" },
//     trustStatus: { type: String, default: "Not Approved" },
//     publishStatus: { type: String, default: "Unpublished" },
//     publishedDate: { type: Date },

//   },
//   { timestamps: true }
// );

// export default mongoose.model<IBusinessListing>(
//   "BusinessListing",
//   BusinessListingSchema
// );


// models/BusinessListing.ts
import mongoose from "mongoose";

const ContactPersonSchema = new mongoose.Schema({
  title: String,
  firstName: String,
  lastName: String,
  contactNumber: String,
  whatsappNumber: String,
  email: String,
});

const BusinessDetailsSchema = new mongoose.Schema({
  businessName: String,
  building: String,
  street: String,
  area: String,
  landmark: String,
  city: String,
  state: String,
  pinCode: String,
});

const TimingSchema = new mongoose.Schema({
  day: String,
  openTime: String,
  openPeriod: String,
  closeTime: String,
  closePeriod: String,
  isOpen: Boolean,
});

const BusinessCategorySchema = new mongoose.Schema({
  category: String,
  subCategory: [String],
  businessImages: [String], // Store image URLs or paths
  about: String,
  keywords: [String],
  businessService: String,
  serviceArea: String,
});

const UpgradeListingSchema = new mongoose.Schema({
  direction: String,
  website: String,
  facebook: String,
  instagram: String,
  linkedin: String,
  twitter: String,
});

const BusinessListingSchema = new mongoose.Schema(
  {
    contactPerson: ContactPersonSchema,
    businessDetails: BusinessDetailsSchema,
    businessTiming: [TimingSchema],
    businessCategory: BusinessCategorySchema,
    upgradeListing: UpgradeListingSchema,
  },
  { timestamps: true }
);

export default mongoose.model("BusinessListing", BusinessListingSchema);
