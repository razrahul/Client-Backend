import express from 'express'
import { createArea, getAreasByCityId } from '../controllers/area.controller.js';


const router =express.Router();
router.get('/getAreasByCityId',getAreasByCityId);
router.post('/createArea',createArea);



export default router;