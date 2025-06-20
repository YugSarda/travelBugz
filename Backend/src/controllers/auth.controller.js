import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Register User
export const register = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(400, "User already exists!");

    const user = new User({ username, email, password, role });
    await user.save();

    res.status(201).json(new ApiResponse(201, "User registered successfully", user));
});

// Login User
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) throw new ApiError(401, "Invalid credentials");


    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" }
    );

    // Return token and user role
    res.json(new ApiResponse(200, "Login successful", { token, role: user.role }));
});


