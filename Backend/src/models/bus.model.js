import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
    busName: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    seatsAvailable: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Bus", BusSchema);
