import express from "express";
import {
    getTrains,
    getTrain,
    createTrain,
    updateTrain,
    deleteTrain
} from "../controllers/train.controller.js";

const router = express.Router();

router.route("/")
    .get(getTrains)        // Get all trains
    .post(createTrain);     // Create new train

router.route("/:id")
    .get(getTrain)          // Get train by ID
    .put(updateTrain)       // Update train
    .delete(deleteTrain);   // Delete train

export default router;
