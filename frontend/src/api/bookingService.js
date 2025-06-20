import API from "./axiosConfig";

// ✅ Get bookings for a specific user by email
export const getUserBookings = async (username) => {
  try {
    const response = await API.get(`/bookings?username=${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }
};

// ✅ Get all bookings (admin)
export const getAllBookings = async () => {
  try {
    const response = await API.get("/bookings");
    return response.data;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return [];
  }
};

// ✅ Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await API.post("/bookings", bookingData);
    return response.data?.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

// ✅ Update booking by ID
export const updateBooking = async (id, updatedData) => {
  try {
    const response = await API.put(`/bookings/${id}`, updatedData);
    return response.data?.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

// ✅ Delete booking by ID
export const deleteBooking = async (id) => {
  try {
    const response = await API.delete(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

