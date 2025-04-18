import mongoose, { Schema, Document } from 'mongoose';

interface IBusinessDetails extends Document {
  businessName: string;
  pinCode: string;
  building: string;
  street: string;
  area: string;
  landmark: string;
  city: string;
  state: string;
  direction: string;
  website: string;
}

const businessDetailsSchema: Schema = new Schema(
  {
    businessName: { type: String, required: true },
    pinCode: { type: String, required: true },
    building: { type: String, required: true },
    street: { type: String, required: true },
    area: { type: String, required: true },
    landmark: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    direction: { type: String, required: false }, // This can be optional
    website: { type: String, required: false },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

const BusinessDetails = mongoose.model<IBusinessDetails>('BusinessDetails', businessDetailsSchema);

export default BusinessDetails;
