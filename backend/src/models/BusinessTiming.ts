// models/BusinessTiming.ts
import mongoose, { Document, Schema } from "mongoose";

// Interface for the BusinessTiming document
interface IBusinessTiming extends Document {
  day: string;
  openTime: string;
  openPeriod: string;
  closeTime: string;
  closePeriod: string;
  isOpen: boolean;
}

const businessTimingSchema: Schema<IBusinessTiming> = new Schema({
  day: { type: String, required: true },
  openTime: { type: String, required: true },
  openPeriod: { type: String, required: true },
  closeTime: { type: String, required: true },
  closePeriod: { type: String, required: true },
  isOpen: { type: Boolean, required: true },
});

const BusinessTiming = mongoose.model<IBusinessTiming>("BusinessTiming", businessTimingSchema);

export default BusinessTiming;
