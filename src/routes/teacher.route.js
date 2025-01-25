import express from 'express'
import { createTeacher, getTeachers } from '../controllers/teacher.controller.js';


const router =express.Router();
router.get('/getTeachers',getTeachers);
router.post('/createTeacher',createTeacher);



export default router;