
import API from "./axiosConfig";

export const loginUser = async (email, password) => {
  try {
    const response = await API.post("/users/login", { email, password });
    localStorage.setItem("email", email);
    localStorage.setItem("token", response.data.token);
   
    return response.data.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await API.get("/users");
    console.log(response.data)
    return response.data.data; // Adjusted to match ApiResponse structure
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch users" };
  }
};
export const registerUser = async (username, email, password, role) => {
  try {
    const response = await API.post("/users/register", {
      username,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
// Get Single User by ID
export const getUserById = async (id) => {
  try {
    const response = await API.get(`/users/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user" };
  }
};

// Update User
export const updateUser = async (id, updatedData) => {
  try {
    const response = await API.put(`/users/${id}`, updatedData);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update user" };
  }
};

// Delete User
export const deleteUser = async (id) => {
  try {
    const response = await API.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete user" };
  }
};

export const searchUsersByUsername = async (username) => {
  try {
    const response = await API.get(`/users/search/username?username=${username}`);
    return response.data.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

