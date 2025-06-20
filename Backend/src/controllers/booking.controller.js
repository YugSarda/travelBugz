import Booking from "../models/booking.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const username = req.query.username;

    // Build query based on username (if provided)
    let query = Booking.find();
    if (username) {
      query = query.where("username").equals(username);
    }

    // Populate foreignKey dynamically using refPath (already defined in your schema)
    const bookings = await query.populate("foreignKey").exec();

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};
// Get single booking
export const getBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate("user").populate("package");
    if (!booking) throw new ApiError(404, "Booking not found");
    res.json(new ApiResponse(200, booking));
});

// Create booking
export const createBooking = asyncHandler(async (req, res) => {
    const booking = new Booking(req.body);
    await booking.save();
    res.json(new ApiResponse(201, booking, "Booking added successfully"));
    console.log("Boking done")
});

// Update booking
export const updateBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) throw new ApiError(404, "Booking not found");
    res.json(new ApiResponse(200, booking, "Booking updated successfully"));
});

// Delete booking
export const deleteBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) throw new ApiError(404, "Booking not found");
    res.json(new ApiResponse(200, null, "Booking deleted successfully"));
});
