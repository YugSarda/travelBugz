import API from "./axiosConfig";

// Fetch all trains
export const getTrains = async () => {
  try {
    const response = await API.get("/trains");
    console.log(response);
    return response.data.data || []; // Extracting data from ApiResponse
  } catch (error) {
    console.error("Error fetching trains:", error);
    return [];
  }
};

// Fetch a single train by ID
export const getTrain = async (trainId) => {
  try {
    const response = await API.get(`/trains/${trainId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching train:", error);
    throw error;
  }
};

// Create a new train (Admin only)
export const createTrain = async (trainData) => {
  console.log(trainData);
  try {
    const response = await API.post("/trains", {
      ...trainData,
      role: "admin", // Manually sending role
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error creating train:", error);
    throw error;
  }
};

// Update an existing train (Admin only)
export const updateTrain = async (trainId, updatedData) => {
  try {
    const response = await API.put(`/trains/${trainId}`, {
      ...updatedData,
      role: "admin", // Manually sending role like in createTrain
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data.data;
  } catch (error) {
    console.error("❌ Error updating train:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a train (Admin only)
export const deleteTrain = async (trainId) => {
  try {
    console.log(`📡 Deleting train with ID: ${trainId}`);
    const response = await API.delete(`/trains/${trainId}`, {
      data: { role: "admin" }, // Ensuring role is passed in DELETE request body
      headers: { "Content-Type": "application/json" }
    });
    console.log("✅ Train deleted successfully:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("❌ Error deleting train:", error.response?.data || error.message);
    throw error;
  }
};
