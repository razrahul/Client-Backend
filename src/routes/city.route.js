import express from 'express'
import { getAllCities,createCity } from '../controllers/city.controller.js';


const router =express.Router();
router.get('/getAllCities',getAllCities);
router.post('/createCity',createCity);



export default router;