import mongoose, { Schema, Document } from 'mongoose';

// Define the BusinessListing Schema
const businessListingSchema = new Schema({
  category: { type: String, required: true },
  subcategories: { type: [String], required: true },
  about: { type: String, required: true },
  images: { type: [String], required: false }
});

// Check if the model already exists to avoid overwriting
const BusinessListing = mongoose.models.BusinessListing || mongoose.model('BusinessListing', businessListingSchema);

export default BusinessListing;
