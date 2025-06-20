import Bus from "../models/bus.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

// Get all buses
export const getBuses = asyncHandler(async (req, res) => {
    const buses = await Bus.find();
    res.json(new ApiResponse(200, buses));
});

// Get single bus
export const getBus = asyncHandler(async (req, res) => {
    const bus = await Bus.findById(req.params.id);
    if (!bus) throw new ApiError(404, "Bus not found");
    res.json(new ApiResponse(200, bus));
});

// Create bus
export const createBus = asyncHandler(async (req, res) => {
    const bus = new Bus(req.body);
    await bus.save();
    res.json(new ApiResponse(201, bus, "Bus added successfully"));
});

// Update bus
export const updateBus = asyncHandler(async (req, res) => {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bus) throw new ApiError(404, "Bus not found");
    res.json(new ApiResponse(200, bus, "Bus updated successfully"));
});

// Delete bus
export const deleteBus = asyncHandler(async (req, res) => {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) throw new ApiError(404, "Bus not found");
    res.json(new ApiResponse(200, null, "Bus deleted successfully"));
});
