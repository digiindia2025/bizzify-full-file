import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    link: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export const Link = mongoose.model("Link", linkSchema);
