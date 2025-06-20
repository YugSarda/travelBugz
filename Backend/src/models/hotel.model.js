import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    hotelName: { type: String, required: true },
    location: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    rating: { type: Number, required: true },
    availableRooms: { type: Number, required: true },
    images: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model("Hotel", HotelSchema);
