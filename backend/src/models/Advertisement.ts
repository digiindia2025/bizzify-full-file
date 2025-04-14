import mongoose from "mongoose";

const AdvertisementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    businessCategory: {
      type: String,
      required: true,
      trim: true,
    },
    subCategory: {
      type: String,
      default: null,
      trim: true,
    },
    childCategory: {
      type: String,
      default: null,
      trim: true,
    },
    redirectUrl: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Advertisement", AdvertisementSchema);
