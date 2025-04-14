import mongoose from "mongoose";

const businessDetailsSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    pinCode: { type: String, required: true },
    building: { type: String, required: true },
    street: { type: String, required: true },
    area: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    direction: { type: String },
    website: { type: String },
  },
  { timestamps: true }
);

const BusinessDetails = mongoose.model("BusinessDetails", businessDetailsSchema);

export default BusinessDetails;
