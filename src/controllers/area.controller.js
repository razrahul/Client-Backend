import Area from "../models/Area.model.js";
import { errorHandler } from "../utlis/error.js";

export const getAreasByCityId = async (req, res, next) => {
  const { showDeleted } = req.query;  
  const { cityId } = req.params;
  try {
    const areas = showDeleted === 'true' ? await Area.find() : await Area.find({ city: cityId, isLive: true });  
    if (!areas.length) {
      return next(errorHandler(404, "No areas found for the given city."));
    }
    res.status(200).json(areas);
  } catch (err) {
    next(errorHandler(500, err.message));  
  }
};

export const createArea = async (req, res, next) => {
  const { name, city } = req.body;
  
  if (!name || !city) {
    return next(errorHandler(400, "Name and City are required"));
  }
  
  const newArea = new Area({ name, city });

  try {
    const area = await newArea.save();
    res.status(201).json(area);
  } catch (err) {
    next(errorHandler(500, err.message));  
  }
};

export const updateArea = async (req, res, next) => {
  const { areaId } = req.params;
  const { name, city, isLive } = req.body;

  try {
    const updatedArea = await Area.findById(areaId);

    if (!updatedArea) {
      return next(errorHandler(404, "Area not found"));
    }

    updatedArea.name = name || updatedArea.name;
    updatedArea.city = city || updatedArea.city;
    updatedArea.isLive = isLive !== undefined ? isLive : updatedArea.isLive; 
    updatedArea.updatedAt = new Date();
    
    const area = await updatedArea.save();
    res.status(200).json(area);
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

export const deleteArea = async (req, res, next) => {
  const { areaId } = req.params;

  try {
    const area = await Area.findById(areaId);

    if (!area) {
      return next(errorHandler(404, "Area not found"));
    }

    area.isLive = false;
    area.deletedAt = new Date(); 
    area.deletedBy = req.user._id; 
    
    await area.save();
    res.status(200).json({ message: "Area marked as deleted" });
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};
