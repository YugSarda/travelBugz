import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { getUserBookings } from "../api/bookingService"; // Adjust path if needed

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", role: "" });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("userRole");

    if (!username || !email || !role || role !== "user") {
      navigate("/login");
    } else {
      setUser({ username, email, role });
      fetchUserBookings(username);
    }
  }, [navigate]);

  const fetchUserBookings = async (username) => {
    const data = await getUserBookings(username);
    setBookings(data);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br p-6 bg-[#002b6b]">
      {/* Profile */}
      <motion.div
  className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl text-center"
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  <FaUserCircle className="text-6xl text-blue-700 mx-auto mb-4" />
  <h1 className="text-3xl font-bold text-black">Welcome, {user.username}!</h1>
  <div className="mt-4 text-black space-y-2">
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Role:</strong> {user.role}</p>
  </div>
</motion.div>


      {/* Booking History */}
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md mb-6 mt-10">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800">📋 All Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">You have no bookings yet.</p>
        ) : (
          <ul className="space-y-3">
            {bookings.map((booking) => (
              <li
                key={booking._id}
                className="border p-4 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">Type: {booking.type}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(booking.bookingDate).toLocaleString()}
                  </p>

                  {/* Conditionally render based on booking type */}
                  {booking.type === "Hotel" && booking.foreignKey && (
                    <p className="text-sm text-gray-700">
                      Hotel: {booking.foreignKey.hotelName} — {booking.foreignKey.location}
                    </p>
                  )}
                  {booking.type === "Flight" && booking.foreignKey && (
                    <p className="text-sm text-gray-700">
                      Flight: {booking.foreignKey.airline} ({booking.foreignKey.flightNumber}) — From {booking.foreignKey.from} to {booking.foreignKey.to}
                    </p>
                  )}
                  {booking.type === "Bus" && booking.foreignKey && (
                    <p className="text-sm text-gray-700">
                      Bus: {booking.foreignKey.busName} — {booking.foreignKey.from} to {booking.foreignKey.to}
                    </p>
                  )}
                  {booking.type === "Train" && booking.foreignKey && (
                    <p className="text-sm text-gray-700">
                      Train: {booking.foreignKey.trainName} — {booking.foreignKey.from} to {booking.foreignKey.to}
                    </p>
                  )}
                  {booking.type === "Package" && booking.foreignKey && (
                    <p className="text-sm text-gray-700">
                      Package Name: {booking.foreignKey.packageName} | Destination:{booking.foreignKey.place}
                    </p>
                  )}
                </div>
                <p className="font-bold text-blue-600">₹{booking.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Logout Button */}
      <motion.button
        className="mt-6 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-lg"
        onClick={handleLogout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiLogOut className="text-lg" />
        Logout
      </motion.button>
    </div>
  );
};

export default UserDashboard;
