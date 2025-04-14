import mongoose, { Schema, Document } from 'mongoose';

interface IBusinessUpgrade extends Document {
  direction: string;
  website: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

const businessUpgradeSchema: Schema = new Schema(
  {
    direction: { type: String, required: true },
    website: { type: String, required: true },
    facebook: { type: String, required: false },
    instagram: { type: String, required: false },
    linkedin: { type: String, required: false },
    twitter: { type: String, required: false },
  },
  { timestamps: true }
);

const BusinessUpgrade = mongoose.model<IBusinessUpgrade>(
  'BusinessUpgrade',
  businessUpgradeSchema
);

export default BusinessUpgrade;
