import express from 'express'
import { createTeacher, deleteTeacher, getTeachers, updateTeacher } from '../controllers/teacher.controller.js';


const router =express.Router();
router.get('/getTeachers',getTeachers);
router.post('/createTeacher',createTeacher);
router.put('/updateTeacher/:teacherId', updateTeacher);
router.delete('/deleteTeacher/:teacherId', deleteTeacher);

export default router;