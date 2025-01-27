import express from 'express'
import { deleteContactForm, getContactForms, submitContactForm, updateContactForm } from '../controllers/contactForm.controller.js';


const router =express.Router();
router.get('/getContactForms',getContactForms);
router.post('/submitContactForm',submitContactForm);
router.put('/updateContactForm/:formId', updateContactForm);
router.delete('/deleteContactForm/:formId', deleteContactForm);


export default router;