import API from "./axiosConfig";

// Fetch all flights
export const getFlights = async () => {
  try {
    const response = await API.get("/flights");
    console.log(response);
    return response.data.data || []; // Extracting data from ApiResponse
  } catch (error) {
    console.error("Error fetching flights:", error);
    return [];
  }
};

// Fetch a single flight by ID
export const getFlight = async (flightId) => {
  try {
    const response = await API.get(`/flights/${flightId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching flight:", error);
    throw error;
  }
};

// Create a new flight (Admin only)
export const createFlight = async (flightData) => {
  console.log(flightData);
  try {
    const response = await API.post("/flights", {
      ...flightData,
      role: "admin", // Manually sending role
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error creating flight:", error);
    throw error;
  }
};

// Update an existing flight (Admin only)
export const updateFlight = async (flightId, updatedData) => {
  try {
    const response = await API.put(`/flights/${flightId}`, {
      ...updatedData,
      role: "admin", // Manually sending role like in createFlight
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data.data;
  } catch (error) {
    console.error("❌ Error updating flight:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a flight (Admin only)
export const deleteFlight = async (flightId) => {
  try {
    console.log(`📡 Deleting flight with ID: ${flightId}`);
    const response = await API.delete(`/flights/${flightId}`, {
      data: { role: "admin" }, // Ensuring role is passed in DELETE request body
      headers: { "Content-Type": "application/json" }
    });
    console.log("✅ Flight deleted successfully:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("❌ Error deleting flight:", error.response?.data || error.message);
    throw error;
  }
};
