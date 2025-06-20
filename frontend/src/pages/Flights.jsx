import React, { useEffect, useState } from "react";
import { getFlights } from "../api/flightService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Framer Motion for animations

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    async function fetchFlights() {
      try {
        const response = await getFlights();
        if (Array.isArray(response)) {
          setFlights(response);
        } else {
          console.error("Unexpected API response format:", response);
          setFlights([]);
        }
      } catch (error) {
        console.error("Failed to fetch flights:", error);
        setFlights([]);
      }
    }
    fetchFlights();
  }, []);

  // ✅ Filtering & Sorting Logic
  const [filteredFlights, setFilteredFlights] = useState([]);

  const handleSearch = () => {
    const filtered = flights
      .filter((flight) => {
        if (from.trim() && !flight.from.toLowerCase().includes(from.toLowerCase())) return false;
        if (to.trim() && !flight.to.toLowerCase().includes(to.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "priceLowToHigh") return a.price - b.price;
        if (sortOption === "priceHighToLow") return b.price - a.price;
        if (sortOption === "duration") return a.duration - b.duration;
        return 0;
      });
  
    setFilteredFlights(filtered);
    setShowResults(true);
  };
  

  return (
    <div className="min-h-screen p-6 bg-[#002b6b]">

      <motion.h2
        className="text-4xl font-bold text-center text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        ✈️ Find Your Flight
      </motion.h2>

      {/* ✅ Search & Sorting Inputs */}
      <motion.div
        className="flex flex-wrap justify-center items-center gap-4 bg-white/100 backdrop-blur-md p-6 rounded-lg shadow-lg max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div>
          <label className="block text-black font-semibold">From</label>
          <input
            type="text"
            placeholder="Enter Departure City"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border p-2 rounded w-48"
          />
        </div>

        <div>
          <label className="block text-black font-semibold">To</label>
          <input
            type="text"
            placeholder="Enter Destination"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border p-2 rounded w-48"
          />
        </div>

        <div>
          <label className="block text-black font-semibold">Departure Date</label>
          <input
            type="date"
            
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="border p-2 rounded w-48"
          />
        </div>

        <div>
          <label className="block text-black font-semibold">Sort By</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded w-48"
          >
            <option value="">Sort By</option>
            <option value="priceLowToHigh">Price - Low to High</option>
            <option value="priceHighToLow">Price - High to Low</option>
            <option value="duration">Duration</option>
          </select>
        </div>

        <motion.button
  onClick={handleSearch}
  className="bg-gradient-to-r bg-blue-600 text-white font-bold px-6 py-2 rounded shadow-lg mt-5 hover:scale-105 transition-all"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  SEARCH
</motion.button>

      </motion.div>

      {/* ✅ Display Flights */}
      {showResults && filteredFlights.length === 0 ? (
        <motion.p
          className="text-center text-white mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          No flights available.
        </motion.p>
      ) :showResults &&  (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredFlights.map((flight) => (
            <motion.div
              key={flight._id}
              className="bg-white/80 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{flight.airline}</h3>
                <p className="text-gray-600"><strong>From:</strong> {flight.from}</p>
                <p className="text-gray-600"><strong>To:</strong> {flight.to}</p>
                <p className="text-gray-600"><strong>Date:</strong> {departure}</p>
                <p className="text-gray-600"><strong>Departure Time:</strong> {flight.departureTime}</p>
                <p className="text-gray-600"><strong>Arrival Time:</strong> {flight.arrivalTime}</p>
                <p className="text-gray-600"><strong>Duration:</strong> {flight.duration} hrs</p>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-2xl font-bold text-blue-700">₹{flight.price}</p>
                  <Link to="/payment" state={{ amount: flight.price,
                    type: "Flight",
                    id: flight._id,
                   }}>
                    <motion.button
                      className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 px-4 rounded hover:scale-105 transition"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Now
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flights;
