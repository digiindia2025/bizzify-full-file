import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;
