import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

import routes from "./routes/index.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);


export default app;
