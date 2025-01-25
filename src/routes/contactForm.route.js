import express from 'express'
import { getContactForms, submitContactForm } from '../controllers/contactForm.controller.js';


const router =express.Router();
router.get('/getContactForms',getContactForms);
router.post('/submitContactForm',submitContactForm);



export default router;