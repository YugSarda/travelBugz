import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    username: { type: String, required: true },
    foreignKey: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "type" },
    type: { type: String, enum: ["Flight", "Bus", "Train", "Hotel", "Package"], required: true },
    bookingDate: { type: Date, default: Date.now },
    price: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);
