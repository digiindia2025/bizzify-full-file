import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  banner: {
    type: String, // URL of the banner image
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  createDate: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
  subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory',  // Assuming you have a SubCategory model
  }]
});

export default mongoose.model("Category", CategorySchema);
