import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    status: { type: String },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const membershipSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, required: true },                  // e.g., "Premium Plan"
    status: { type: String, required: true },                // e.g., "Active", "Inactive"
    paymentStatus: { type: String, default: "Pending" },     // e.g., "Complete", "Pending"
    paymentMode: { type: String },                           // e.g., "Razorpay", "UPI"
    startDate: { type: Date },                               // e.g., "2025-02-21"
    endDate: { type: Date },                                 // e.g., "2025-06-19"
    history: [historySchema],                                // array of { status, date }
  },
  { timestamps: true }
);

export const Membership = mongoose.model("Membership", membershipSchema);
