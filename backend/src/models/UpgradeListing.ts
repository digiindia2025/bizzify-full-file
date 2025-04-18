import mongoose, { Schema, Document } from "mongoose";

interface IUpgradeListing extends Document {
  direction: string;
  website: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

const upgradeListingSchema: Schema = new Schema({
  direction: { type: String, required: true },
  website: { type: String, required: true, unique: true },
  facebook: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
});

const UpgradeListing = mongoose.model<IUpgradeListing>("UpgradeListing", upgradeListingSchema);

export default UpgradeListing;
