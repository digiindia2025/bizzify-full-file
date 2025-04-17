import mongoose from "mongoose";

// Business schema definition
const businessSchema = new mongoose.Schema({
  businessCategory: String,
  businessDetails: String,
  businessTiming: String,
  contactPerson: {
    title: String,
    firstName: String,
    lastName: String,
    contactNumber: String,
    whatsappNumber: String,
    email: String,
  },
  upgradeListing: {
    direction: String,
    website: String,
    facebook: String,
    instagram: String,
    linkedin: String,
    twitter: String,
  },
});

// Create model for business
const Business = mongoose.model("Business", businessSchema);

export default Business;
