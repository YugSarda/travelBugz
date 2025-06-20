import Train from "../models/train.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

// Get all trains
export const getTrains = asyncHandler(async (req, res) => {
    const trains = await Train.find();
    res.json(new ApiResponse(200, trains));
});

// Get single train
export const getTrain = asyncHandler(async (req, res) => {
    const train = await Train.findById(req.params.id);
    if (!train) throw new ApiError(404, "Train not found");
    res.json(new ApiResponse(200, train));
});

// Create train
export const createTrain = asyncHandler(async (req, res) => {
    const train = new Train(req.body);
    await train.save();
    res.json(new ApiResponse(201, train, "Train added successfully"));
});

// Update train
export const updateTrain = asyncHandler(async (req, res) => {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!train) throw new ApiError(404, "Train not found");
    res.json(new ApiResponse(200, train, "Train updated successfully"));
});

// Delete train
export const deleteTrain = asyncHandler(async (req, res) => {
    const train = await Train.findByIdAndDelete(req.params.id);
    if (!train) throw new ApiError(404, "Train not found");
    res.json(new ApiResponse(200, null, "Train deleted successfully"));
});
