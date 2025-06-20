
import express from "express";
import { 
    getUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser, 
    loginUser, 
    searchUsers
} from "../controllers/user.controller.js";

const router = express.Router();

// User Routes
router.get("/", getUsers);          // Get all users
router.get("/:id", getUser);        // Get a single user by ID
router.post("/register", createUser); // Register a new user
router.post("/login", loginUser);   // Login user
router.put("/:id", updateUser);     // Update user details
router.delete("/:id", deleteUser);  // Delete a user
router.get("/username",searchUsers)

export default router;
