import express from 'express'
import { createArea, deleteArea, getAreasByCityId, updateArea } from '../controllers/area.controller.js';


const router =express.Router();
router.get('/getAreasByCityId',getAreasByCityId);
router.post('/createArea',createArea);
router.put('/updateArea/:areaId', updateArea);
router.delete('/deleteArea/:areaId', deleteArea);

export default router;