import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  updateTeacher,
    getTeacherById,
    updateLiveTeacher
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

export default router;
