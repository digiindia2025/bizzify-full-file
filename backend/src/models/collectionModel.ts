import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  name: String,
  link: String,
});

export default mongoose.model("Collection", collectionSchema);
