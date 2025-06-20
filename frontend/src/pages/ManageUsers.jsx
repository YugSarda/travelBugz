import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  registerUser,
} from "../api/authService";
import { FaTrash, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
    setFilteredUsers(data);
  };

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
    });
  };

  const handleUpdate = async () => {
    // If a password is provided during update, it must be exactly 8 characters
    if (formData.password && formData.password.length !== 8) {
      alert("Password must be exactly 8 characters long.");
      return;
    }
  
    await updateUser(editingUser, formData);
    setEditingUser(null);
    setFormData({ username: "", email: "", password: "", role: "user" });
    fetchUsers();
  };
  

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      fetchUsers();
    }
  };

  const handleCreate = async () => {
    if (formData.password.length !== 8) {
      alert("Password must be exactly 8 characters long.");
      return;
    }
    try {
      await registerUser(
        formData.username,
        formData.email,
        formData.password,
        formData.role
      );
      setFormData({ username: "", email: "", password: "", role: "user" });
      fetchUsers();
    } catch (error) {
      alert(error.message);
    }
  };
  

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>

      {/* Search */}
      <div className="flex gap-3 items-center justify-center mb-6">
        <input
          type="text"
          placeholder="Search by username"
          className="p-2 border rounded w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Form */}
      <div className="bg-white p-4 rounded-lg shadow-md max-w-xl mx-auto mb-6">
        <h3 className="text-xl font-semibold mb-3">
          {editingUser ? "Edit User" : "Add New User"}
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded pr-10"
              minLength={8}
              maxLength={8}
              required={!editingUser}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-2.5 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <motion.button
            onClick={editingUser ? handleUpdate : handleCreate}
            whileHover={{ scale: 1.05 }}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {editingUser ? "Update User" : "Create User"}
          </motion.button>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2 flex gap-3 justify-center">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
