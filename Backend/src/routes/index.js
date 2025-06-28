import express from "express";
import busRoutes from "./bus.routes.js";
import trainRoutes from "./train.routes.js";
import hotelRoutes from "./hotel.routes.js";
import packageRoutes from "./package.routes.js";
import bookingRoutes from "./booking.routes.js";
import flightRoutes from "./flights.routes.js";
import userRoutes from "./user.routes.js";
import weatherRoutes from './weatherRoutes.js';
import chatbotRoute from './chatbotRoute.js';
import groupTripRoutes from './groupTripRoutes.js';
import messageRoutes from './messageRoutes.js';



import itineraryRoutes from './itineraryRoutes.js';
// import recommendationsRouter from './recommendation.routes.js'
const router = express.Router();

router.use("/buses", busRoutes);
router.use("/trains", trainRoutes);
router.use("/hotels", hotelRoutes);
router.use("/packages", packageRoutes);
router.use("/bookings", bookingRoutes);
router.use("/flights", flightRoutes);
router.use("/users", userRoutes);
router.use('/itinerary', itineraryRoutes);
router.use('/weather', weatherRoutes);
router.use('/chat', chatbotRoute);
 router.use('/group', groupTripRoutes);
 router.use('/messages', messageRoutes);
export default router;
