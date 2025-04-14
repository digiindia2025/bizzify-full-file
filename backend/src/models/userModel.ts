import mongoose, { Schema, Document } from "mongoose";


// TypeScript Interface
export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  status: "active" | "inactive";
  resetToken?: string;
  resetTokenExpiry?: Date;
}

// Schema definition
const userSchema: Schema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      index: true, // Add an index for email
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/  // Regex pattern for email validation
    },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

// Avoid model overwrite error in development
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
