import Area from "../models/Area.model.js";
import { errorHandler } from "../utlis/error.js";

export const getAreasByCityId = async (req, res, next) => {
  const { cityId } = req.params;
  try {
    const areas = await Area.find({ city: cityId });
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
