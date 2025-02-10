import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

import Student from "../models/Student.model.js";

export const getAllStudents = catchAsyncError(async (req, res, next) => {
 
    const students = await Student.find({isdeleted:false}).sort({createdAt: 1})
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    });

    if (!students) {
      return next(new ErrorHandler(404, "Students Not Found"));
    }

    res.status(200).json({
      success: true,
      message: "All students found successfully",
      students,
    });
    
  
});

//create student

export const createStudent = catchAsyncError(async (req, res, next) => {

    const { name, email, className, areaId, gender, age } = req.body; // Renaming 'class' to 'className'
  
    const newStudent = new Student({
      name,
      email,
      class: className, 
      area: areaId,
      gender,
      age,
    });
  
    const student = await newStudent.save(); // Use 'save()' instead of 'create()' here

    if(!student){
      return next(new ErrorHandler(500, "Student Not Created"));
    }
  
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  
  });


  // get student by id
  export const getStudentById = catchAsyncError(async (req, res, next) => {

    const { Id } = req.params;

    const student = await Student.findById({_id:Id, isdeleted:false})
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    });

    if (!student) {
      return next(new ErrorHandler(404, "Student not found"));
    }

    res.status(200).json({
      success: true,
      message: "Student found successfully",
      student,
    });

  });

  //update student
  export const updateStudent = catchAsyncError(async (req, res, next) => {

    const { Id } = req.params;

    const student = await Student.findById({_id:Id, isdeleted:false})
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    });

    if (!student) {
      return next(new ErrorHandler(404, "Student not found"));
    }

    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;
    student.class = req.body.class || student.class;
    student.area = req.body.area || student.area;
    student.gender = req.body.gender || student.gender;
    student.age = req.body.age || student.age;

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });

  });

  //delete student
  export const deleteStudent = catchAsyncError(async (req, res, next) => {

    const { Id } = req.params;

    const student = await Student.findById({_id:Id, isdeleted:false})
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    });

    if (!student) {
      return next(new ErrorHandler(404, "Student not found"));
    }

    student.isdeleted = true;

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      student,
    });

  });
  