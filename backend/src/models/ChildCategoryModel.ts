// src/models/ChildCategory.ts
import mongoose from "mongoose";

const childCategorySchema = new mongoose.Schema({
  parentCategory: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});

const ChildCategory = mongoose.model("ChildCategory", childCategorySchema);

export default ChildCategory;
