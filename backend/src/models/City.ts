import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true, default: "INDIA" },
  imageUrl: { type: String, required: true },
  color: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("City", citySchema);
