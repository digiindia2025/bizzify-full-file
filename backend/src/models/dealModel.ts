import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
  name: String,
  link: String,
});

export default mongoose.model("Deal", dealSchema);
