import City from "../models/City.model.js";
import { errorHandler } from "../utlis/error.js";

export const getAllCities = async (req, res, next) => {
  try {
    const cities = await City.find();
    if (!cities.length) {
      return next(errorHandler(404, "No cities found."));
    }
    res.status(200).json(cities);
  } catch (err) {
    next(errorHandler(500, err.message));  
  }
};

export const createCity = async (req, res, next) => {
  const { name,isLive } = req.body;

  if (!name) {
    return next(errorHandler(400, "City name is required"));
  }

  const newCity = new City({ name,isLive });

  try {
    const city = await newCity.save();
    res.status(201).json(city);
  } catch (err) {
    next(errorHandler(500, err.message));  
  }
};
