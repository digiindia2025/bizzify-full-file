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
    phone: { type: String, required: true },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // Or "Subcategory" if you're linking subcategories
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["Published", "Unpublished"],
      default: "Unpublished",
    },
    businessStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    trustStatus: {
      type: String,
      enum: ["Verified", "Not Verified"],
      default: "Not Verified",
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Make sure this matches the actual User model name
      required: true,
    },
  },
  { timestamps: true }
);

const BusinessDetails = mongoose.model("BusinessDetails", businessDetailsSchema);

export default BusinessDetails;
