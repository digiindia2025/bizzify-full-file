import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
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
});

export default mongoose.model("Category", CategorySchema);
