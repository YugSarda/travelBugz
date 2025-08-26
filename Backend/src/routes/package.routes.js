
import express from "express";
import {
    getPackages,
    getPackage,
    createPackage,
    updatePackage,
    deletePackage
} from "../controllers/package.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";  




const router = express.Router();

// Public Routes (Accessible to all)
router.get("/", getPackages);
router.get("/:id", getPackage);

// Admin Routes (Restricted to admin users)
router.post("/", verifyAdmin, createPackage);
router.put("/:id", verifyAdmin, updatePackage);
router.delete("/:id", verifyAdmin, deletePackage);

export default router;
