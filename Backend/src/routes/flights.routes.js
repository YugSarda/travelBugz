import express from "express";
import { getFlights, getFlight, createFlight, updateFlight, deleteFlight } from "../controllers/flight.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", getFlights);
router.get("/:id", getFlight);
router.post("/",verifyAdmin, createFlight);
router.put("/:id",verifyAdmin, updateFlight);
router.delete("/:id",verifyAdmin, deleteFlight);

export default router;
