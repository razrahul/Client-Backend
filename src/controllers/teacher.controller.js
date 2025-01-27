import Teacher from "../models/Teacher.model.js";
import { errorHandler } from "../utlis/error.js";

export const getTeachers = async (req, res, next) => {
  const { showDeleted } = req.query;  
  const { cityId, areaId } = req.query;
  try {
    const teachers = showDeleted === 'true' ? await Teacher.find() :await Teacher.find({ city: cityId, area: areaId, isLive: true })  // Only show live teachers (not deleted)
      .populate('city')
      .populate('area');
    
    if (!teachers.length) {
      return next(errorHandler(404, "No teachers found for the given city and area."));
    }

    res.status(200).json(teachers);
  } catch (err) {
    next(errorHandler(500, err.message));  
  }
};

export const createTeacher = async (req, res, next) => {
  const { name, city, area, aboutUs, subject, chargeRate } = req.body;

  if (!name || !city || !area || !aboutUs || !subject || !chargeRate) {
    return next(errorHandler(400, "All fields are required"));
  }

  const newTeacher = new Teacher({
    name,
    city,
    area,
    aboutUs,
    subject,
    chargeRate,
  });

  try {
    const teacher = await newTeacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    next(errorHandler(500, err.message));  
  }
};

export const updateTeacher = async (req, res, next) => {
  const { teacherId } = req.params;
  const { name, city, area, aboutUs, subject, chargeRate, isLive } = req.body;

  try {
    const updatedTeacher = await Teacher.findById(teacherId);

    if (!updatedTeacher) {
      return next(errorHandler(404, "Teacher not found"));
    }

    updatedTeacher.name = name || updatedTeacher.name;
    updatedTeacher.city = city || updatedTeacher.city;
    updatedTeacher.area = area || updatedTeacher.area;
    updatedTeacher.aboutUs = aboutUs || updatedTeacher.aboutUs;
    updatedTeacher.subject = subject || updatedTeacher.subject;
    updatedTeacher.chargeRate = chargeRate || updatedTeacher.chargeRate;
    updatedTeacher.isLive = isLive !== undefined ? isLive : updatedTeacher.isLive; 
    updatedTeacher.updatedAt = new Date();
    
    const teacher = await updatedTeacher.save();
    res.status(200).json(teacher);
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

export const deleteTeacher = async (req, res, next) => {
  const { teacherId } = req.params;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return next(errorHandler(404, "Teacher not found"));
    }

    teacher.isLive = false; 
    teacher.deletedAt = new Date(); 
    teacher.deletedBy = req.user._id; 
    
    await teacher.save();
    res.status(200).json({ message: "Teacher marked as deleted" });
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};
