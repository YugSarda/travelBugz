import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    destinations: [{ type: String }], // Example: ["Goa", "Manali"]
    interests: [{ type: String }],    // Example: ["beach", "hiking"]
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
