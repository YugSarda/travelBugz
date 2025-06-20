import API from "./axiosConfig";

// Fetch all buses
export const getBuses = async () => {
  try {
    const response = await API.get("/buses");
    console.log(response);
    return response.data.data || []; // Extracting data from ApiResponse
  } catch (error) {
    console.error("Error fetching buses:", error);
    return [];
  }
};

// Fetch a single bus by ID
export const getBus = async (busId) => {
  try {
    const response = await API.get(`/buses/${busId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching bus:", error);
    throw error;
  }
};

// Create a new bus (Admin only)
export const createBus = async (busData) => {
  console.log(busData);
  try {
    const response = await API.post("/buses", {
      ...busData,
      role: "admin", // Manually sending role
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error creating bus:", error);
    throw error;
  }
};

// Update an existing bus (Admin only)
export const updateBus = async (busId, updatedData) => {
  try {
    const response = await API.put(`/buses/${busId}`, {
      ...updatedData,
      role: "admin", // Manually sending role like in createBus
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data.data;
  } catch (error) {
    console.error("❌ Error updating bus:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a bus (Admin only)
export const deleteBus = async (busId) => {
  try {
    console.log(`📡 Deleting bus with ID: ${busId}`);
    const response = await API.delete(`/buses/${busId}`, {
      data: { role: "admin" }, // Ensuring role is passed in DELETE request body
      headers: { "Content-Type": "application/json" }
    });
    console.log("✅ Bus deleted successfully:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("❌ Error deleting bus:", error.response?.data || error.message);
    throw error;
  }
};
