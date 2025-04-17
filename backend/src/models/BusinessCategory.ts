import mongoose, { Schema, Document } from "mongoose";

interface IBusinessCategory extends Document {
  category: string[];
  businessImages: string[];
  about: string;
  keywords: string[];
  serviceArea: string[];
}

const businessCategorySchema = new Schema<IBusinessCategory>({
  category: { type: [String], required: true },
  businessImages: { type: [String], required: true },
  about: { type: String, required: true },
  keywords: { type: [String], default: [] },
  serviceArea: { type: [String], default: [] },
});

const BusinessCategory = mongoose.model<IBusinessCategory>(
  "BusinessCategory",
  businessCategorySchema
);

export default BusinessCategory;
