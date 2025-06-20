import express from "express";
import {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
} from "../controllers/booking.controller.js";

const router = express.Router();

router.route("/")
    .get(getBookings)        // Get all bookings
    .post(createBooking);     // Create new booking

router.route("/:id")
    .get(getBooking)          // Get booking by ID
    .put(updateBooking)       // Update booking
    .delete(deleteBooking);   // Delete booking

export default router;
