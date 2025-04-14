import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  email: String,
  rating: Number,
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
