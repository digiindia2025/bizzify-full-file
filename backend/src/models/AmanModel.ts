import mongoose from "mongoose";

const AmanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// 👇 This connects to the 'aman' collection in the 'Biziffy' DB
export const AmanModel = mongoose.model("Aman", AmanSchema, "aman");
