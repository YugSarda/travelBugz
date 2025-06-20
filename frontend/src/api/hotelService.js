import API from "./axiosConfig";

// Fetch all hotels
export const getHotels = async () => {
  try {
    const response = await API.get("/hotels");
    console.log(response);
    return response.data.data || []; // Extracting data from ApiResponse
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
};

// Fetch a single hotel by ID
export const getHotel = async (hotelId) => {
  try {
    const response = await API.get(`/hotels/${hotelId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching hotel:", error);
    throw error;
  }
};

// Create a new hotel (Admin only)
export const createHotel = async (hotelData) => {
  console.log(hotelData);
  try {
    const response = await API.post("/hotels", {
      ...hotelData,
      role: "admin", // Manually sending role
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error creating hotel:", error);
    throw error;
  }
};

// Update an existing hotel (Admin only)
export const updateHotel = async (hotelId, updatedData) => {
  try {
    const response = await API.put(`/hotels/${hotelId}`, {
      ...updatedData,
      role: "admin", // Manually sending role like in createHotel
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data.data;
  } catch (error) {
    console.error("❌ Error updating hotel:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a hotel (Admin only)
export const deleteHotel = async (hotelId) => {
  try {
    console.log(`📡 Deleting hotel with ID: ${hotelId}`);
    const response = await API.delete(`/hotels/${hotelId}`, {
      data: { role: "admin" }, // Ensuring role is passed in DELETE request body
      headers: { "Content-Type": "application/json" }
    });
    console.log("✅ Hotel deleted successfully:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("❌ Error deleting hotel:", error.response?.data || error.message);
    throw error;
  }
};
