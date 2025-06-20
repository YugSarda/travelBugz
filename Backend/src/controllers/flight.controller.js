import Flight from "../models/flight.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

// Get all flights
export const getFlights = asyncHandler(async (req, res) => {
    const flights = await Flight.find();
    res.json(new ApiResponse(200, flights));
});

// Get single flight
export const getFlight = asyncHandler(async (req, res) => {
    const flight = await Flight.findById(req.params.id);
    if (!flight) throw new ApiError(404, "Flight not found");
    res.json(new ApiResponse(200, flight));
});

// Create flight
export const createFlight = asyncHandler(async (req, res) => {
    const flight = new Flight(req.body);
    await flight.save();
    res.json(new ApiResponse(201, flight, "Flight added successfully"));
});

// Update flight
export const updateFlight = asyncHandler(async (req, res) => {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!flight) throw new ApiError(404, "Flight not found");
    res.json(new ApiResponse(200, flight, "Flight updated successfully"));
});

// Delete flight
export const deleteFlight = asyncHandler(async (req, res) => {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) throw new ApiError(404, "Flight not found");
    res.json(new ApiResponse(200, null, "Flight deleted successfully"));
});
