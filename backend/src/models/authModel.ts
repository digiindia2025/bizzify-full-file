import { Schema, model, Document } from "mongoose";

interface IAuth extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  status: "active" | "inactive" | "pending";  // Add 'pending' as a valid status
  otp?: string; // Optional field for OTP
  otpExpiry?: Date; // Optional field for OTP expiry
}

const authSchema = new Schema<IAuth>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],  // Ensure 'pending' is added to the enum
    default: "pending",  // Set 'pending' as the default status
  },

  otp: {
    type: String, 
    default: null
  },
  otpExpiry: {
    type: Date,
    default: null
  }
  
});

// Pre-save hook to hash the password before saving it in the database
authSchema.pre("save", async function (next) {
  const user = this as IAuth;

  // Only hash the password if it is new or modified
  if (user.isModified("password")) {
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password with a salt of 10 rounds
    user.password = hashedPassword; // Set the hashed password in the user document
  }

  next();
});

const Auth = model<IAuth>("Auth", authSchema);  // Change the model name to 'Auth'

export default Auth;
