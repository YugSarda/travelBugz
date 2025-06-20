import React, { useState } from "react";
import { registerUser } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../api/authService";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    if (password.length !== 8) {
      setError("❌ Password must be exactly 8 characters.");
      return;
    }
  
    try {
      // Step 1: Register the user
      await registerUser(username, email, password, role);
      alert("🎉 Registration successful!");
  
      // Step 2: Auto-login the user after successful registration
      const response = await loginUser(email, password);
      console.log("Full API Response:", response);
  
      const { token, role: userRole, username: loggedInUsername } = response;
  
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("username", loggedInUsername);
  
      console.log("Received token:", token);
      console.log("Received role:", userRole);
  
      const redirectPath = userRole === "admin" ? "/admin-dashboard" : "/user-dashboard";
      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath);
  
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
  
      if (errorMessage === "Username already exists") {
        setError("❌ This username is already taken. Try another.");
      } else if (errorMessage === "Email already registered") {
        setError("❌ This email is already registered. Try with another email.");
      } else if (errorMessage === "Invalid credentials") {
        setError("❌ Login failed! Invalid credentials.");
      } else {
        setError("❌ Registration or auto-login failed! Please try again.");
      }
    }
  };
  
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              minLength={8}
              maxLength={8}
              className={`w-full p-3 border rounded-lg focus:outline-none transition ${
                password.length !== 8 ? "focus:ring-red-400 border-red-400" : "focus:ring-blue-400"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <small
            className={`block mt-1 text-sm ${
              password.length !== 8 ? "text-red-500" : "text-green-600"
            }`}
          >
            {password.length !== 8
              ? "Password must be exactly 8 characters."
              : "Looks good!"}
          </small>

          <select
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Register
          </motion.button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
