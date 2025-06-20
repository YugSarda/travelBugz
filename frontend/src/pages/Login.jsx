import React, { useState } from "react";
import { loginUser } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await loginUser(email, password);
      console.log("Full API Response:", response);
      const { token, role, username } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("username", username);
      
      console.log("Received token:", token);
      console.log("Received role:", role);
      const redirectPath = role === "admin" ? "/admin-dashboard" : "/user-dashboard";
      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath);
    } catch (error) {
      setError("Login failed! Invalid credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="p-8 bg-white shadow-lg rounded-2xl w-96 backdrop-blur-lg bg-opacity-90"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="email"
            placeholder="Email"
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="password"
            placeholder="Password"
            
            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg w-full font-semibold shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;