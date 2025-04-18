import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  alternateNumbers: [{ type: String }], // optional
  whatsappNumber: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model("Contact", contactSchema);
