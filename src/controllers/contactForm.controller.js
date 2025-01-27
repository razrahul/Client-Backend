import ContactForm from "../models/ContactForm.model.js";
import { errorHandler } from "../utlis/error.js";

export const getContactForms = async (req, res, next) => {
  const { showDeleted } = req.query;  

  try {
    const contactForms = showDeleted === 'true' ? await ContactForm.find() : await ContactForm.find({ isLive: true });  
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

export const updateContactForm = async (req, res, next) => {
  const { formId } = req.params;
  const { name, number, whatsappNumber, email, role, class: className, subjectList, timeslot, feeRange, incomplete, isLive } = req.body;

  try {
    const updatedContactForm = await ContactForm.findById(formId);

    if (!updatedContactForm) {
      return next(errorHandler(404, "Contact form not found"));
    }

    updatedContactForm.name = name || updatedContactForm.name;
    updatedContactForm.number = number || updatedContactForm.number;
    updatedContactForm.whatsappNumber = whatsappNumber || updatedContactForm.whatsappNumber;
    updatedContactForm.email = email || updatedContactForm.email;
    updatedContactForm.role = role || updatedContactForm.role;
    updatedContactForm.class = className || updatedContactForm.class;
    updatedContactForm.subjectList = subjectList || updatedContactForm.subjectList;
    updatedContactForm.timeslot = timeslot || updatedContactForm.timeslot;
    updatedContactForm.feeRange = feeRange || updatedContactForm.feeRange;
    updatedContactForm.incomplete = incomplete !== undefined ? incomplete : updatedContactForm.incomplete;
    updatedContactForm.isLive = isLive !== undefined ? isLive : updatedContactForm.isLive; 
    updatedContactForm.updatedAt = new Date();
    
    const contactForm = await updatedContactForm.save();
    res.status(200).json(contactForm);
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

export const deleteContactForm = async (req, res, next) => {
  const { formId } = req.params;

  try {
    const contactForm = await ContactForm.findById(formId);

    if (!contactForm) {
      return next(errorHandler(404, "Contact form not found"));
    }

    contactForm.isLive = false; 
    contactForm.deletedAt = new Date(); 
    contactForm.deletedBy = req.user._id; 
    await contactForm.save();
    res.status(200).json({ message: "Contact form marked as deleted" });
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};
