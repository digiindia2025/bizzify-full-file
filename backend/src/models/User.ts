import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  status: {
    type: String,
    enum: ["Active", "Inactive", "Deactivated"],
    default: "Active",
  },
});

// ✅ Fix: Check if model already exists before creating it
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
