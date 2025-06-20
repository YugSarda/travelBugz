import Package from "../models/package.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";


// Add this new controller function

// Get all packages
export const getPackages = asyncHandler(async (req, res) => {
    const packages = await Package.find();
    res.json(new ApiResponse(200, packages));
});

// Get single package
export const getPackage = asyncHandler(async (req, res) => {
    const packageData = await Package.findById(req.params.id);
    if (!packageData) throw new ApiError(404, "Package not found");
    res.json(new ApiResponse(200, packageData));
});

// Create package
export const createPackage = asyncHandler(async (req, res) => {
    const packageData = new Package(req.body);
    await packageData.save();
    res.json(new ApiResponse(201, packageData, "Package added successfully"));
});

// Update package
export const updatePackage = asyncHandler(async (req, res) => {
    const packageData = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!packageData) throw new ApiError(404, "Package not found");
    res.json(new ApiResponse(200, packageData, "Package updated successfully"));
});

// Delete package
export const deletePackage = asyncHandler(async (req, res) => {
    const packageData = await Package.findByIdAndDelete(req.params.id);
    if (!packageData) throw new ApiError(404, "Package not found");
    res.json(new ApiResponse(200, null, "Package deleted successfully"));
});

export const getAIRecommendations = asyncHandler(async (req, res) => {
    const { username } = req.query;
    const limit = parseInt(req.query.limit) || 5;
    
    if (!username) throw new ApiError(400, "Username is required");
    
    const recommendations = await RecommendationService.getRecommendations(username, limit);
    res.json(new ApiResponse(200, recommendations, "AI recommendations generated successfully"));
});
