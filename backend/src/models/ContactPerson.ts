// models/ContactPerson.ts
import mongoose from "mongoose";

const contactPersonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    alternateNumbers: [{ type: String }],
    whatsappNumber: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ContactPerson", contactPersonSchema);
