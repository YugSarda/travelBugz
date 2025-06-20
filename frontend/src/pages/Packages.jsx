import React, { useEffect, useState } from "react";
import { getPackages } from "../api/packageService";
import { Link } from "react-router-dom";
import { FaUmbrellaBeach } from "react-icons/fa"; // ✅ Import icon

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await getPackages();
        console.log("Fetched Packages:", response);

        if (Array.isArray(response)) {
          setPackages(response);
        } else {
          console.error("Unexpected API response format:", response.data);
          setPackages([]);
        }
      } catch (error) {
        console.error("Failed to fetch packages:", error);
        setPackages([]);
      }
    }
    fetchPackages();
  }, []);

  const filteredAndSortedPackages = [...packages]
    .filter((pkg) => {
      if (toCity.trim() === "") return true;
      return pkg.place.toLowerCase().includes(toCity.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOption === "priceLowToHigh") return a.price - b.price;
      if (sortOption === "priceHighToLow") return b.price - a.price;
      if (sortOption === "duration") return a.duration - b.duration;
      return 0;
    });

  return (
    <div className="container mx-auto p-6 bg-[#002b6b]">
      {/* ✅ Heading with Icon */}
      <h2 className="text-3xl font-bold text-center text-white mb-6 flex justify-center items-center gap-3">
        <FaUmbrellaBeach className="text-yellow-400 text-4xl" />
        Find Your Perfect Package
      </h2>

      {/* ✅ Search & Sorting Inputs */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center items-center gap-4 w-full">
          {/* From City */}
          <div>
            <label className="block font-semibold">From City</label>
            <input
              type="text"
              placeholder="Enter Departure City"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="border p-2 rounded w-48"
            />
          </div>

          {/* To City */}
          <div>
            <label className="block font-semibold">To City/Country</label>
            <input
              type="text"
              placeholder="Enter Destination"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="border p-2 rounded w-48"
            />
          </div>

          {/* Departure Date */}
          <div>
            <label className="block font-semibold">Departure Date</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="border p-2 rounded w-48"
            />
          </div>

          {/* Sort Option */}
          <div>
            <label className="block font-semibold">Sort By</label>
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
        </div>

        {/* ✅ SEARCH Button below fields */}
        <button
  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-8 py-2 rounded shadow-lg mt-4 
             hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
>
  SEARCH
</button>

        
      </div>

      {/* ✅ Packages Display */}
      {filteredAndSortedPackages.length === 0 ? (
        <p className="text-center text-gray-300 mt-6">No packages available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredAndSortedPackages.map((pkg) => {
            const nights = pkg.duration - 1;
            const durationText = `${nights}N/${pkg.duration}D`;

            return (
              <div key={pkg._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {pkg.image ? (
                  <img src={pkg.image} alt={pkg.packageName} className="w-full h-52 object-cover" />
                ) : (
                  <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-lg font-bold">{pkg.packageName}</h3>

                  <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                    {durationText}
                  </span>

                  <p className="text-gray-600 mt-1"><strong>Destination:</strong> {pkg.place}</p>
                  <p className="text-sm text-gray-700 mt-2">{pkg.description}</p>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-xl font-bold text-gray-800">₹{pkg.price}</p>
                    {pkg.discount && (
                      <span className="text-green-600 text-sm">Extra ₹{pkg.discount} off</span>
                    )}
                  </div>

                  <Link 
                    to="/payment" 
                    state={{ 
                      amount: pkg.price,
                      type: "Package",
                      id: pkg._id,
                    }}
                  >
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Packages;
