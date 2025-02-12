import express from "express"
import {
    createFeedback,
    getAllFeedbacks,
    getByIdFeedback
} from "../controllers/feedback.controller.js"

const router = express.Router();

//creaet feedback
router.route("/feedback").post(createFeedback);

//get all feedback
router.route("/feedback").get(getAllFeedbacks);

//get by id
router.route("/feedback/:id").get(getByIdFeedback);
export default router;