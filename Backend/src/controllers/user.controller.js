import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Get all users
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(new ApiResponse(200, users));
});

// Get single user
export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, "User not found");
    res.json(new ApiResponse(200, user));
});

export const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;
  
    try {
      const newUser = new User({ username, email, password, role });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyPattern)[0];
        const message =
          duplicateField === "username"
            ? "Username already exists"
            : "Email already registered";
        return res.status(400).json({ message });
      }
  
      res.status(500).json({ message: "Registration failed", error });
    }
  };
  

// Update user
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) throw new ApiError(404, "User not found");
    res.json(new ApiResponse(200, user, "User updated successfully"));
});

// Delete user
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new ApiError(404, "User not found");
    res.json(new ApiResponse(200, null, "User deleted successfully"));
});

// Login user
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(401, "Invalid email or password");

    // Verify password (Plain text comparison; Hashing is recommended)
    if (user.password !== password) throw new ApiError(401, "Invalid email or password");

    // Generate JWT Token
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" }
    );

    res.json(new ApiResponse(200, { token, role: user.role,username: user.username }, "Login successful"));
});

// Search users by username
export const searchUsers = asyncHandler(async (req, res) => {
    const { username } = req.query;
  
    const users = await User.find({
      username: { $regex: username, $options: "i" }, // case-insensitive partial match
    });
  
    res.json(new ApiResponse(200, users, "Users fetched successfully"));
  });
  
