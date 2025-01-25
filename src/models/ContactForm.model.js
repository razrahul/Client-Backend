import mongoose, { Schema } from "mongoose";
import BaseModelSchema from "./Base.model.js";

const ContactFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: Number, required: true },
  class: { type: String, required: true },
  subjectList: [{ type: String }],
  timeslot: { type: String, required: true },
  feeRange: { type: String },
  incomplete: { type: Boolean, default: false },
  ...BaseModelSchema.obj, // Inherit from BaseModel
});

const ContactForm = mongoose.model("ContactForm", ContactFormSchema);
export default ContactForm;
