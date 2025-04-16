import mongoose, { Document, Schema } from 'mongoose';

interface ISubcategory extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
  status: string;
  image: string;
  banner: string;
}

const SubcategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    image: { type: String, required: true },
    banner: { type: String, required: true },
  },
  { timestamps: true }
);

const Subcategory = mongoose.model<ISubcategory>('Subcategory', SubcategorySchema);

export default Subcategory;
