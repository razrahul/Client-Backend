import Teacher from "../models/Teacher.model.js";
import { errorHandler } from "../utlis/error.js";

export const getTeachers = async (req, res, next) => {
  const { cityId, areaId } = req.query;
  try {
    const teachers = await Teacher.find({ city: cityId, area: areaId })
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
