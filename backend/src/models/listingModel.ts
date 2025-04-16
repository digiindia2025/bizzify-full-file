import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: String,
  category: String,
  user: String,
  createdDate: String,
  publishedDate: { type: Date, default: null }, // Add a default value if not provided
  status: { 
    type: String, 
    enum: ['Draft', 'Pending', 'Approved', 'Rejected', 'Published'], // 'Published' added
    default: "Pending" 
  },
  businessStatus: String,
  trustStatus: String,
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
