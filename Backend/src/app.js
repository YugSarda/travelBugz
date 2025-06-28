// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./db/index.js";

// import routes from "./routes/index.js";


// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api", routes);


// export default app;
import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./db/index.js";  
import cors from "cors";
import dotenv from "dotenv";
import Message from "./models/Message.js";
import routes from "./routes/index.js";
dotenv.config();
connectDB();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api", routes);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
  });

  socket.on("sendMessage", async ({ groupId, text, userId }) => {
    const message = new Message({ sender: userId, text, group: groupId });
    await message.save();
    io.to(groupId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server and Socket.IO running at http://localhost:${PORT}`);
})


