import React, { useEffect, useState } from "react";
import { getTrains } from "../api/trainService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrain, FaSearch, FaRupeeSign, FaClock } from "react-icons/fa";

const Train = () => {
  const [trains, setTrains] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    async function fetchTrains() {
      try {
        const response = await getTrains();
        if (Array.isArray(response)) {
          setTrains(response);
        } else {
          console.error("Unexpected API response format:", response);
          setTrains([]);
        }
      } catch (error) {
        console.error("Failed to fetch trains:", error);
        setTrains([]);
      }
    }
    fetchTrains();
  }, []);

  const handleSearch = () => {
    const filtered = trains
      .filter((train) => {
        if (from.trim() && !train.from.toLowerCase().includes(from.toLowerCase())) return false;
        if (to.trim() && !train.to.toLowerCase().includes(to.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "priceLowToHigh") return a.price - b.price;
        if (sortOption === "priceHighToLow") return b.price - a.price;
        if (sortOption === "duration") return a.duration - b.duration;
        return 0;
      });
  
    setFilteredTrains(filtered);
    setShowResults(true);
  };
  

  return (
    <div className="min-h-screen p-6 bg-[#002b6b]">

    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-4xl font-extrabold text-center mb-8 text-white"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        🚆 Explore Available Trains
      </motion.h2>

      <motion.div
  className="flex flex-col items-center gap-6 bg-white/80 p-6 rounded-xl shadow-2xl backdrop-blur-lg"
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.7 }}
>
  {/* Inputs Row */}
  <div className="flex flex-wrap justify-center items-center gap-6">
    <div>
      <label className="block font-semibold mb-1">From</label>
      <input
        type="text"
        placeholder="Departure city"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="border p-2 rounded w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">To</label>
      <input
        type="text"
        placeholder="Destination city"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border p-2 rounded w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">Departure Date</label>
      <input
        type="date"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
        className="border p-2 rounded w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">Sort By</label>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border p-2 rounded w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">None</option>
        <option value="priceLowToHigh">Price - Low to High</option>
        <option value="priceHighToLow">Price - High to Low</option>
        <option value="duration">Duration</option>
      </select>
    </div>
  </div>

  {/* Search Button Centered Below */}
  <div className="mt-4">
  <button
  onClick={handleSearch}
  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-transform duration-300 transform hover:scale-105"
>
  <FaSearch /> SEARCH
</button>

  </div>
</motion.div>


{showResults && filteredTrains.length === 0 ? (
  <p className="text-center text-gray-600 mt-8">No trains available.</p>
) : showResults && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {filteredTrains.map((train) => (
            <motion.div
              key={train._id}
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                <FaTrain className="inline-block mr-2" />{train.trainName}
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Route:</strong> {train.from} → {train.to}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Departure:</strong> {train.departureTime}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Arrival:</strong> {train.arrivalTime}
              </p>
              <p className="text-gray-700 mb-1">
                <strong><FaClock className="inline-block mr-1" />Duration:</strong> {train.duration}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Date:</strong> {departureDate || "N/A"}
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-xl text-green-600 font-bold">
                  <FaRupeeSign className="inline-block mr-1" />{train.price}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Seats:</strong> {train.seatsAvailable}
                </p>
              </div>
              <Link to="/payment" state={{ amount: train.price,
                type: "Train",
                id: train._id,
               }}>
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300">
                  Book Now
                </button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
    </div>
  );
};

export default Train;
