import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: String,
  category: String,
  user: String,
  createdDate: String,
  publishedDate: String,
  status: String,
  businessStatus: String,
  trustStatus: String,
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
