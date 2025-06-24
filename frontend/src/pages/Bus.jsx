import React, { useEffect, useState } from "react";
import { getBuses } from "../api/busService";
import { Link } from "react-router-dom";

const Bus = () => {
  const [buses, setBuses] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // ✅ Fetch bus data
  useEffect(() => {
    async function fetchBuses() {
      try {
        const response = await getBuses();
        console.log("Fetched Buses:", response);
        setBuses(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Failed to fetch buses:", error);
        setBuses([]);
      }
    }
    fetchBuses();
  }, []);

  // ✅ Filter and Sort buses
  const handleSearch = () => {
    const filtered = buses
      .filter((bus) => {
        if (from.trim() && !bus.from.toLowerCase().includes(from.toLowerCase())) return false;
        if (to.trim() && !bus.to.toLowerCase().includes(to.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "priceLowToHigh") return a.price - b.price;
        if (sortOption === "priceHighToLow") return b.price - a.price;
        if (sortOption === "duration") return a.duration - b.duration;
        return 0;
      });
  
    setFilteredBuses(filtered);
    setShowResults(true);
  };
  

  return (
    <div className="min-h-screen p-6 bg-[#002b6b]">

      {/* 🔹 Title */}
      <h2 className="text-4xl font-extrabold text-center text-white mb-8 animate-fadeIn">
        🚌 Find Your Perfect Bus
      </h2>

      {/* 🔹 Search & Sorting Section */}
<div className="flex flex-col gap-6 bg-white p-6 rounded-xl shadow-lg animate-slideIn items-center">
  {/* Inputs Row */}
  <div className="flex flex-wrap justify-center items-center gap-6">
    <div>
      <label className="block font-semibold text-gray-700">From</label>
      <input
        type="text"
        placeholder="Enter departure city"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="border p-3 rounded w-52 shadow-sm focus:ring focus:ring-blue-300"
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700">To</label>
      <input
        type="text"
        placeholder="Enter destination city"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border p-3 rounded w-52 shadow-sm focus:ring focus:ring-blue-300"
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700">Departure Date</label>
      <input
        type="date"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
        className="border p-3 rounded w-52 shadow-sm focus:ring focus:ring-blue-300"
      />
    </div>
    <div>
      <label className="block font-semibold text-gray-700">Sort By</label>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border p-3 rounded w-52 shadow-sm focus:ring focus:ring-blue-300"
      >
        <option value="">Sort By</option>
        <option value="priceLowToHigh">Price - Low to High</option>
        <option value="priceHighToLow">Price - High to Low</option>
        <option value="duration">Duration</option>
      </select>
    </div>
  </div>

  {/* Search Button - Centered Below */}
  <div className="mt-4">
  <button
  onClick={handleSearch}
  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded shadow-lg transition transform hover:scale-105"
>
  SEARCH
</button>

  </div>
</div>

      {/* 🔹 Bus Listings */}
      {showResults && filteredBuses.length === 0 ? (

        <p className="text-center text-gray-500 mt-10 text-lg animate-fadeIn">
          No buses available. Try a different search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredBuses.map((bus) => (
            <div
              key={bus._id}
              className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn"
            >
              {/* 🔹 Bus Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800">{bus.busName}</h3>
                <p className="text-gray-600 mt-1">
                  <strong>Route:</strong> {bus.from} → {bus.to}
                </p>
                <p className="text-gray-600"><strong>Date:</strong> {departureDate}</p>
                <p className="text-gray-600"><strong>Duration:</strong> {bus.duration} hrs</p>
                <p className="text-gray-600"><strong>Departure:</strong> {bus.departureTime}</p>
                <p className="text-gray-600"><strong>Arrival:</strong> {bus.arrivalTime}</p>
                <p className="text-gray-600"><strong>Seats Available:</strong> {bus.seatsAvailable}</p>

                {/* 🔹 Price & Booking */}
                <div className="flex justify-between items-center mt-6">
                  <p className="text-2xl font-extrabold text-gray-800">₹{bus.price}</p>
                </div>

                {/* 🔹 Book Now Button */}
                <Link to="/payment" state={{ amount: bus.price,
                    type: "Bus",
                    id: bus._id,
                 }}>
                  <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-blue-500/50">
                    🚀 Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bus;
