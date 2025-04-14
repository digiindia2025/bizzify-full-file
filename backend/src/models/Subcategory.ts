import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  category: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export default mongoose.model("Subcategory", subcategorySchema);
