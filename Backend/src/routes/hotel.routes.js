import express from "express";
import {
    getHotels,
    getHotel,
    createHotel,
    updateHotel,
    deleteHotel
} from "../controllers/hotel.controller.js";

const router = express.Router();

router.route("/")
    .get(getHotels)        // Get all hotels
    .post(createHotel);     // Create new hotel

router.route("/:id")
    .get(getHotel)          // Get hotel by ID
    .put(updateHotel)       // Update hotel
    .delete(deleteHotel);   // Delete hotel

export default router;
