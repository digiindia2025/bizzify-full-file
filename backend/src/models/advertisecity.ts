import mongoose from 'mongoose';

const advertiseCitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

const AdvertiseCity = mongoose.model('AdvertiseCity', advertiseCitySchema);
export default AdvertiseCity;
