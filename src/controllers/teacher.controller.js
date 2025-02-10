import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Teacher from "../models/Teacher.model.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllTeachers = async (req, res, next) => {
 
  try {
    const teachers = await Teacher.find({isdeleted:false}).sort({createdAt: 1})
    .populate({
      path: "city",
      select: "name",
      match: { isdeleted: false }, // Filter cities where isdeleted is false
    })
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    });
    if (!teachers.length) {
      return next(new ErrorHandler(404, "No teachers found for the given city and area."));
    }

    res.status(200).json({
      success: true,
      message: "All teachers found successfully",
      teachers,
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));  
  }
};

export const createTeacher = async (req, res, next) => {
  const { name, cityId, areaId, aboutUs, subject, chargeRate } = req.body;

  if (!name || !cityId || !areaId || !aboutUs || !subject || !chargeRate) {
    return next(new ErrorHandler(400, "All fields are required"));
  }

  //TODO: subject and charge rate should be array , then to stringfy and pudh in aarry to db

  try {
    const newTeacher = await Teacher.create({
      name,
      city: cityId,
      area: areaId,
      aboutUs,
      subject,
      chargeRate,
    });

    const teacher = await Teacher.findById(newTeacher._id)
    .populate({
      path: "city",
      select: "name",
      match: { isdeleted: false }, // Filter cities where isdeleted is false
    })
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    });

    res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      teacher: teacher,
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));  
  }
};

export const updateTeacher = async (req, res, next) => {
  const { teacherId } = req.params;
  const { name, cityId, areaId, aboutUs, subject, chargeRate } = req.body;

  try {
    const updatedTeacher = await Teacher.findById({_id:teacherId, isdeleted:false});

    if (!updatedTeacher) {
      return next(new ErrorHandler(404, "Teacher not found"));
    }

    updatedTeacher.name = name || updatedTeacher.name;
    updatedTeacher.city = cityId || updatedTeacher.city;
    updatedTeacher.area = areaId || updatedTeacher.area;
    updatedTeacher.aboutUs = aboutUs || updatedTeacher.aboutUs;
    updatedTeacher.subject = subject || updatedTeacher.subject;
    updatedTeacher.chargeRate = chargeRate || updatedTeacher.chargeRate;
    
    const teacher = await updatedTeacher.save();

    const teacherData = await Teacher.findById(teacher._id)
    .populate({
      path: "city",
      select: "name",
      match: { isdeleted: false }, // Filter cities where isdeleted is false
    })
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    });
    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      teacher: teacherData,
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
};

export const deleteTeacher = async (req, res, next) => {
  const { teacherId } = req.params;

  try {
    const teacher = await Teacher.findById({_id:teacherId, isdeleted:false})
    .populate({
      path: "city",
      select: "name",
      match: { isdeleted: false }, // Filter cities where isdeleted is false
    })
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    });

    if (!teacher) {
      return next(new ErrorHandler(404, "Teacher not found"));
    }

    teacher.isdeleted = true;
    teacher.deletedAt = new Date(); 
    
    await teacher.save();
    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
      teacher: teacher,
    });
  } catch (err) {
    next(new ErrorHandler(500, err.message));
  }
};

//get teacher by id
export const getTeacherById = catchAsyncError(async (req, res, next) => {
  
  const { teacherId } = req.params;

  const teacher = await Teacher.findById({_id:teacherId, isdeleted:false})
  .populate({
      path: "city",
      select: "name",
      match: { isdeleted: false }, // Filter cities where isdeleted is false
    })
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    }); 

    if (!teacher) {
      return next(new ErrorHandler(404, "Teacher not found"));
    }

    res.status(200).json({
      success: true,
      message: "Teacher found successfully",
      teacher,
    }); 

});

//update Live

export const updateLiveTeacher = catchAsyncError(async (req, res, next) => {

  const { teacherId } = req.params;

  const teacher = await Teacher.findById({_id:teacherId, isdeleted:false})
  .populate({
      path: "city",
      select: "name",
      match: { isdeleted: false }, // Filter cities where isdeleted is false
    })
    .populate({
      path: "area",
      select: "name",
      match: { isdeleted: false }, // Filter areas where isdeleted is false
    });

    if (!teacher) {
      return next(new ErrorHandler(404, "Teacher not found"));
    }

    teacher.isLive = !teacher.isLive;

    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      teacher,
    });

});


//find teacher by subject and area
export const getTeacherBySubjectAndArea = catchAsyncError(async (req, res, next) => {
  const { subject, areaId } = req.body;

  // if (!subject || !areaId) {
  //   return next(new ErrorHandler(400, "Subject and areaId are required."));
  // }

  

  const teachers = await Teacher.find({
    $and:[
      {$or: [{ subject: { $regex: new RegExp(subject, "i") } }, { area:areaId }]},
      {isdeleted: false,}
    ]
  })
    // .populate({
    //   path: "city",
    //   select: "name",
    //   match: { isdeleted: false },
    // })
    // .populate({
    //   path: "area",
    //   select: "name",
    //   match: { isdeleted: false },
    // });

  if (!teachers.length) {
    return next(new ErrorHandler(404, "No teachers found for the given subject and area."));
  }

  res.status(200).json({
    success: true,
    message: "All teachers found successfully",
    teachers,
    // teachers: teachers.map(teacher => ({
    //   _id: teacher._id,
    //   name: teacher.name,
    //   subject: teacher.subject,
    //   city: teacher.city?.name || "Unknown City",
    //   area: teacher.area?.name || "Unknown Area",
    //   aboutUs: teacher.aboutUs,
    //   chargeRate: teacher.chargeRate,
    //   image: teacher.image || null,
    // })),
  });
});



export const FindTeacherBySubjectAndArea = catchAsyncError(async (req, res, next) => {
  const { SubjectandAreaName } = req.body;

  // MongoDB Aggregation Pipeline
  const teachers = await Teacher.aggregate([
    // Lookup to join the Area collection
    {
      $lookup: {
        from: "areas", // The collection name in MongoDB for areas
        localField: "area", // The field in Teacher collection to match with
        foreignField: "_id", // The field in Areas collection to match with
        as: "areaDetails" // Result will be stored in the field `areaDetails`
      }
    },
    // Match teachers by subject and area name after the lookup
    {
      $match: {
        $and: [
          { isdeleted: false }, // Ensure the teacher is not deleted
          { 
            $or: [
              { name: { $regex: new RegExp(SubjectandAreaName, "i") } }, //find to find
              { subject: { $regex: new RegExp(SubjectandAreaName, "i") } }, // Match subject using regex (case-insensitive)
              { "areaDetails.name": { $regex: new RegExp(SubjectandAreaName, "i") } } // Match area name in joined areaDetails
            ]
          }
        ]
      }
    },
    // Lookup to join the City collection
    {
      $lookup: {
        from: "cities", // The collection name in MongoDB for cities
        localField: "city", // The field in Teacher collection to match with
        foreignField: "_id", // The field in Cities collection to match with
        as: "cityDetails" // Result will be stored in the field `cityDetails`
      }
    },
    // Project the final data and format the result
    {
      $project: {
        _id: 1,
        name: 1,
        subject: 1,
        aboutUs: 1,
        chargeRate: 1,
        image: 1,
        area: { $arrayElemAt: ["$areaDetails.name", 0] }, // Extract the area name from the array
        city: { $arrayElemAt: ["$cityDetails.name", 0] } // Extract the city name from the array
      }
    }
  ]);

  // If no teachers found, return an error
  if (!teachers.length) {
    return next(new ErrorHandler(404, "No teachers found for the given subject or area."));
  }

  // Send response with the found teachers
  res.status(200).json({
    success: true,
    message: "Teachers found successfully",
    teachers,
  });
});
