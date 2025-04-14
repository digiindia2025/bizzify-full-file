import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    userName: { type: String },
    title: { type: String, required: true },
    name: { type: String, required: true },
    requirement: { type: String },
  },
  { timestamps: true }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
