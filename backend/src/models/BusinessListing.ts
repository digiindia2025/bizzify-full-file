import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the combined BusinessListing schema
interface IBusinessListing extends Document {
  contactPerson: {
    title: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    alternateNumbers?: string[];
    whatsappNumber?: string;
    email: string;
  };
  businessDetails: {
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    businessAddress: string;
  };
  businessCategories: string[];
  businessTimings: { weekday: string; openingTime: string; closingTime: string }[];
  upgradeListing: {
    direction?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// Define the combined schema
const businessListingSchema = new Schema<IBusinessListing>({
  contactPerson: {
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    alternateNumbers: { type: [String] },
    whatsappNumber: { type: String },
    email: { type: String, required: true },
  },
  businessDetails: {
    businessName: { type: String, required: true },
    businessEmail: { type: String, required: true },
    businessPhone: { type: String, required: true },
    businessAddress: { type: String, required: true },
  },
  businessCategories: { type: [String], required: true },
  businessTimings: [{
    weekday: { type: String, required: true },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true }
  }],
  upgradeListing: {
    direction: { type: String },
    website: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
  },
});

// Create the BusinessListing model
const BusinessListing = mongoose.model<IBusinessListing>("BusinessListing", businessListingSchema);

export default BusinessListing;
