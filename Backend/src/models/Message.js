import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  timestamp: { type: Date, default: Date.now },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
});

export default mongoose.model("Message", messageSchema);
