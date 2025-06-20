import mongoose from "mongoose";

const TrainSchema = new mongoose.Schema({
    trainName: { type: String, required: true },
    trainNumber: { type: String, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    seatsAvailable: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Train", TrainSchema);
