import mongoose from "mongoose";

const MainSubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  banner: { type: String },
});

const SubcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    banner: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    mainSubCategories: [MainSubCategorySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Subcategory", SubcategorySchema);
