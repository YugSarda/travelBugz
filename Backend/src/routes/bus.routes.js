import express from "express";
import {
    getBuses,
    getBus,
    createBus,
    updateBus,
    deleteBus
} from "../controllers/bus.controller.js";

const router = express.Router();

router.route("/")
    .get(getBuses)        // Get all buses
    .post(createBus);     // Create new bus

router.route("/:id")
    .get(getBus)          // Get bus by ID
    .put(updateBus)       // Update bus
    .delete(deleteBus);   // Delete bus

export default router;
