import express from "express"

import {
    createSubject,
    getAllSubject,
    getSubjectById,
    updateSubject,
    deleteSubject
} from "../controllers/subject.controller.js"

const router = express.Router();
//create subject
router.route("/subject").post(createSubject);

//get all subject
router.route("/subject").get(getAllSubject);

//get subject by id
router.route("/subject/:id").get(getSubjectById);

//update subject
router.route("/subject/:Id").put(updateSubject);

//delete subject
router.route("/subject/:subjectId").delete(deleteSubject);

export default router;