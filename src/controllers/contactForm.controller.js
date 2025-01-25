import ContactForm from "../models/ContactForm.model.js";
import { errorHandler } from "../utlis/error.js";

export const getContactForms = async (req, res, next) => {
  try {
    const contactForms = await ContactForm.find();
    
    if (!contactForms.length) {
      return next(errorHandler(404, "No contact forms found."));
    }
    
    res.status(200).json(contactForms);
  } catch (err) {
    next(errorHandler(500, err.message));  
  }
};

export const submitContactForm = async (req, res, next) => {
  const { name, number, whatsappNumber, email, role, class: className, subjectList, timeslot, feeRange, incomplete } = req.body;

  if (!name || !number || !email || !role || !className || !subjectList || !timeslot || !feeRange) {
    return next(errorHandler(400, "All fields are required except 'incomplete'"));
  }

  const newContactForm = new ContactForm({
    name,
    number,
    whatsappNumber,
    email,
    role,
    class: className,
    subjectList,
    timeslot,
    feeRange,
    incomplete,
  });

  try {
    const contactForm = await newContactForm.save();
    res.status(201).json(contactForm);
  } catch (err) {
    next(errorHandler(500, err.message));  
  }
};
