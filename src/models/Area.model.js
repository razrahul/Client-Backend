import mongoose, { Schema } from 'mongoose';
import BaseModelSchema from './Base.model.js'

const AreaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: Schema.Types.ObjectId, ref: "City", required: true },
  ...BaseModelSchema.obj, // Inherit from BaseModel
});

const Area = mongoose.model("Area", AreaSchema);
export default Area;
