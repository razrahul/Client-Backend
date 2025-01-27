import City from "../models/City.model.js";
import { errorHandler } from "../utlis/error.js";

// export const getAllCities = async (req, res, next) => {
//   try {
//     const cities = await City.find({ isLive: true });  
//     if (!cities.length) {
//       return next(errorHandler(404, "No cities found."));
//     }
//     res.status(200).json(cities);
//   } catch (err) {
//     next(errorHandler(500, err.message));  
//   }
// };
export const getAllCities = async (req, res, next) => {
  const { showDeleted } = req.query;  

  try {
    const cities = showDeleted === 'true' ? await City.find() : await City.find({ isLive: true });
    
    if (!cities.length) {
      return next(errorHandler(404, "No cities found."));
    }

    res.status(200).json(cities);
  } catch (err) {
    next(errorHandler(500, err.message));  
  }
};


export const createCity = async (req, res, next) => {
  const { name, isLive } = req.body;

  if (!name) {
    return next(errorHandler(400, "City name is required"));
  }

  const newCity = new City({ name, isLive });

  try {
    const city = await newCity.save();
    res.status(201).json(city);
  } catch (err) {
    next(errorHandler(500, err.message));  
  }
};

export const updateCity = async (req, res, next) => {
  const { cityId } = req.params;
  const { name, isLive } = req.body;

  try {
    const updatedCity = await City.findById(cityId);

    if (!updatedCity) {
      return next(errorHandler(404, "City not found"));
    }

    updatedCity.name = name || updatedCity.name;
    updatedCity.isLive = isLive !== undefined ? isLive : updatedCity.isLive; 
    updatedCity.updatedAt = new Date();
    
    const city = await updatedCity.save();
    res.status(200).json(city);
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

export const deleteCity = async (req, res, next) => {
  const { cityId } = req.params;

  try {
    const city = await City.findById(cityId);

    if (!city) {
      return next(errorHandler(404, "City not found"));
    }

    city.isLive = false; 
    city.deletedAt = new Date(); 
    city.deletedBy = req.user._id; 
    
    await city.save();
    res.status(200).json({ message: "City marked as deleted" });
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};