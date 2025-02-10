import express from "express"
import {
    getAllStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent
} from "../controllers/student.controller.js"


const router = express.Router();

//GEt All Students
router.route("/students").get( getAllStudents);

//create student
router.route("/student").post(createStudent);

//get Student by id
router.route("/student/:Id").get(getStudentById);

//update student
router.route("/student/:Id").put(updateStudent);

//delete student
router.route("/student/:Id").delete(deleteStudent);


export default router;