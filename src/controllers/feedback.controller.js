import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js"

import Feedback from "../models/Feedback.model.js";
import Teacher from "../models/Teacher.model.js";
import Student from "../models/Student.model.js";

//create feedback
export const createFeedback = catchAsyncError(async (req, res, next) => {
  const { userId, feedback, rating } = req.body;

  // Identify if userId belongs to Teacher or Student
  const isTeacher = await Teacher.findById(userId);
  const isStudent = await Student.findById(userId);

  if (!isTeacher && !isStudent) {
    return next(new ErrorHandler("Invalid user ID", 400));
  }

  const userType = isTeacher ? "Teacher" : "Student";

  // Save feedback
  const newFeedback = new Feedback({
    user: userId,
    userType,
    feedback,
    rating,
  });

  await newFeedback.save();
  res.status(201).json({
    success: true,
    message: "Feedback submitted successfully",
    feedback: newFeedback,
  });
});
//get all feedbacks
export const getAllFeedbacks = catchAsyncError(async (req, res, next) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1})
  .populate("user")
  ;
  res.status(200).json({
    success: true,
    message:"All Feedback Fetch Successfull",
    feedbacks,
  });
});

//get feedback by id
export const getByIdFeedback = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Find feedback and populate user details
  const feedbacks = await Feedback.find({ user: id }).populate("user");

  if (!feedbacks.length) {
    return res.status(404).json({ message: "No feedback found for this user" });
  }

  res.status(200).json({
    success: true,
    message: "Feedbacks fetched successfully",
    feedbacks,
  });
});
