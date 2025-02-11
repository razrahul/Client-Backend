import mongoose, { Schema } from "mongoose";
import BaseModelSchema from "./Base.model.js";

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  city: { type: Schema.Types.ObjectId, ref: "City",  },
  area: { type: Schema.Types.ObjectId, ref: "Area", required: true },
  aboutUs: { type: String },
  subject: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  chargeRate: { type: Number, required: true },
  ...BaseModelSchema.obj, // Inherit from BaseModel
});

const Teacher = mongoose.model("Teacher", TeacherSchema);
export default Teacher;
