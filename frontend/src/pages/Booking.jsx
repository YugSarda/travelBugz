import React from "react";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 py-10 px-6 md:px-12"
    >
      {/* 🔹 Dark Overlay for readability */}
      <div className="absolute inset-0 bg-opacity-60"></div>

      {/* 🔹 Booking Content Section */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg animate-fadeIn">
          ✨ Book Your Perfect Trip ✨
        </h1>
        <p className="text-lg mb-8 text-black-300 animate-fadeIn">
          Get the <strong>best deals</strong> on flights, hotels, trains, and buses.
        </p>

        {/* 🔹 Enlarged Booking Buttons */}
        <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/flights")}
            className="min-w-[180px] px-10 py-5 bg-blue-500 bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 ease-in-out rounded-xl shadow-xl text-2xl font-semibold transform hover:scale-105 hover:shadow-blue-500/50"
          >
            ✈ Flights
          </button>
          <button
            onClick={() => navigate("/hotels")}
            className="min-w-[180px] px-10 py-5 bg-green-500 bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 ease-in-out rounded-xl shadow-xl text-2xl font-semibold transform hover:scale-105 hover:shadow-green-500/50"
          >
            🏨 Hotels
          </button>
          <button
            onClick={() => navigate("/trains")}
            className="min-w-[180px] px-10 py-5 bg-red-500 bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 ease-in-out rounded-xl shadow-xl text-2xl font-semibold transform hover:scale-105 hover:shadow-red-500/50"
          >
            🚆 Trains
          </button>
          <button
            onClick={() => navigate("/buses")}
            className="min-w-[180px] px-10 py-5 bg-yellow-500 bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 ease-in-out rounded-xl shadow-xl text-2xl font-semibold transform hover:scale-105 hover:shadow-yellow-500/50"
          >
            🚌 Buses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
