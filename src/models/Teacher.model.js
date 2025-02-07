import mongoose, { Schema } from 'mongoose';
import BaseModelSchema from "./Base.model.js";

const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    area: { type: Schema.Types.ObjectId, ref: 'Area', required: true },
    aboutUs: { type: String },
    subject: { type: String },
    chargeRate: { type: Number, required: true },
    image: { type: String },
    ...BaseModelSchema.obj, // Inherit from BaseModel
  });
  
const Teacher = mongoose.model('Teacher', TeacherSchema);
export default Teacher;
  