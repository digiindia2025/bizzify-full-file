import mongoose, { Schema, Document } from 'mongoose';

interface IBusinessTiming extends Document {
  day: string;
  openTime: string;
  closeTime: string;
}

const businessTimingSchema = new Schema<IBusinessTiming>({
  day: { type: String, required: true },
  openTime: { type: String, required: true },
  closeTime: { type: String, required: true },
});

const BusinessTiming = mongoose.model<IBusinessTiming>('BusinessTiming', businessTimingSchema);

export default BusinessTiming;
