import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  message: String,
  state: String,
  city: String,
  services: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Contact = mongoose.model("Contact", contactSchema);
