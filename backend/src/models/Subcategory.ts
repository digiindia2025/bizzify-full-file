import { Schema, model, Document } from "mongoose";

interface Subcategory extends Document {
  name: string;
  category: string;
  status: "active" | "inactive";
  createdAt: Date;
  imageUrl: string;
}

const subcategorySchema = new Schema<Subcategory>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true, enum: ["active", "inactive"], default: "inactive" },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, default: "" },
});

const SubcategoryModel = model<Subcategory>("Subcategory", subcategorySchema);

export default SubcategoryModel;
