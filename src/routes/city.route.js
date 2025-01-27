import express from 'express'
import { getAllCities,createCity, updateCity, deleteCity } from '../controllers/city.controller.js';


const router =express.Router();
router.get('/getAllCities',getAllCities);
router.post('/createCity',createCity);
router.put('/updateCity/:cityId', updateCity);
router.delete('/deleteCity/:cityId', deleteCity);


export default router;