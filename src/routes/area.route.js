import express from 'express'
import { createArea, deleteArea, getAreasByCityId, updateArea, getAllAreas, getAreaById, updateLiveStatus, getAreaByCityId } from '../controllers/area.controller.js';


const router =express.Router();
// router.get('/getAreasByCityId',getAreasByCityId);
router.post('/createArea',createArea);
router.put('/updateArea/:areaId', updateArea);
router.delete('/deleteArea/:areaId', deleteArea);

//get All Area
router.get('/getAreas',getAllAreas);

//get Area by Id
router.get('/getAreaById/:areaId',getAreaById);

//update Live status
router.patch('/updateLiveStatus/:id', updateLiveStatus);

//get Area by cityId
// router.get('/getAreaByCityId/:cityId', getAreaByCityId);

export default router;