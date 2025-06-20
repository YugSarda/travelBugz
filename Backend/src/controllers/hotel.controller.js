import Hotel from "../models/hotel.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

// Get all hotels
export const getHotels = asyncHandler(async (req, res) => {
    const hotels = await Hotel.find();
    res.json(new ApiResponse(200, hotels));
});

// Get single hotel
export const getHotel = asyncHandler(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) throw new ApiError(404, "Hotel not found");
    res.json(new ApiResponse(200, hotel));
});

// Create hotel
export const createHotel = asyncHandler(async (req, res) => {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.json(new ApiResponse(201, hotel, "Hotel added successfully"));
});

// Update hotel
export const updateHotel = asyncHandler(async (req, res) => {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) throw new ApiError(404, "Hotel not found");
    res.json(new ApiResponse(200, hotel, "Hotel updated successfully"));
});

// Delete hotel
export const deleteHotel = asyncHandler(async (req, res) => {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) throw new ApiError(404, "Hotel not found");
    res.json(new ApiResponse(200, null, "Hotel deleted successfully"));
});
