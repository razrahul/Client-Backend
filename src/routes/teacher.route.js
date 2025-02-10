import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  updateTeacher,
    getTeacherById,
    updateLiveTeacher,
    getTeacherBySubjectAndArea,
    FindTeacherBySubjectAndArea
} from "../controllers/teacher.controller.js";

const router = express.Router();
router.get("/getTeachers", getAllTeachers);
router.post("/createTeacher", createTeacher);
router.put("/updateTeacher/:teacherId", updateTeacher);
router.delete("/deleteTeacher/:teacherId", deleteTeacher);

//get teacher by id
router.get("/getTeacherById/:teacherId", getTeacherById);

//update live
router.patch("/updateLiveTeacher/:teacherId", updateLiveTeacher);

//find teacher by subject and area
router.get("/admin/teacher", getTeacherBySubjectAndArea);

//find teacher by subject and area
router.get("/findteacher", FindTeacherBySubjectAndArea);

export default router;
