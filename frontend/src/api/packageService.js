import API from "./axiosConfig";

// Fetch all packages
export const getPackages = async () => {
  try {
    const response = await API.get("/packages");
    console.log(response);
    return response.data.data || []; // Extracting data from ApiResponse
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
};

// Fetch a single package by ID
export const getPackage = async (packageId) => {
  try {
    const response = await API.get(`/packages/${packageId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching package:", error);
    throw error;
  }
};

export const createPackage = async (packageData) => {
  console.log(packageData);
  try {
    const response = await API.post("/packages", {
      ...packageData,
      role: "admin", // Manually sending role
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error creating package:", error);
    throw error;
  }
};

// Update an existing package (Admin only)
export const updatePackage = async (packageId, updatedData) => {
  try {
    const response = await API.put(`/packages/${packageId}`, {
      ...updatedData,
      role: "admin", // Manually sending role like in createPackage
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data.data;
  } catch (error) {
    console.error("❌ Error updating package:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a package (Admin only)
export const deletePackage = async (packageId) => {
  try {
    console.log(`📡 Deleting package with ID: ${packageId}`);
    const response = await API.delete(`/packages/${packageId}`, {
      data: { role: "admin" }, // Ensuring role is passed in DELETE request body
      headers: { "Content-Type": "application/json" }
    });
    console.log("✅ Package deleted successfully:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("❌ Error deleting package:", error.response?.data || error.message);
    throw error;
  }
};


