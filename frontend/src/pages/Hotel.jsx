import React, { useEffect, useState } from "react";
import { getHotels } from "../api/hotelService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [rooms, setRooms] = useState("");
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImages, setMainImages] = useState({});
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const response = await getHotels();
        setHotels(response);
        setFilteredHotels(response);

        const initialImages = {};
        response.forEach((hotel) => {
          if (hotel.images?.length) {
            initialImages[hotel._id] = 0; // Store index instead of image URL
          }
        });
        setMainImages(initialImages);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  const handleSearch = () => {
    const filtered = hotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredHotels(filtered);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-[#002b6b]">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          🏨 Find Your Perfect Stay
        </h1>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full backdrop-blur-md bg-opacity-80"
      >
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block mb-1 font-medium">Location</label>
    <input
      type="text"
      placeholder="Enter city or hotel name"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="p-2 border rounded w-full"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Check-in Date</label>
    <input
      type="date"
      value={checkIn}
      onChange={(e) => setCheckIn(e.target.value)}
      className="p-2 border rounded w-full"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Check-out Date</label>
    <input
      type="date"
      value={checkOut}
      onChange={(e) => setCheckOut(e.target.value)}
      className="p-2 border rounded w-full"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium">Guests & Rooms</label>
    <div className="flex space-x-4">
      <input
        type="number"
        min="1"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        className="p-2 border rounded w-24"
        placeholder="Guests"
      />
      <input
        type="number"
        min="1"
        value={rooms}
        onChange={(e) => setRooms(e.target.value)}
        className="p-2 border rounded w-24"
        placeholder="Rooms"
      />
    </div>
  </div>
</div>

        <div className="flex justify-center mt-4">
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={handleSearch}
    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-8 py-2 rounded shadow-lg 
    hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
  >
    SEARCH
  </motion.button>
</div>
      </motion.div>

      <div className="mt-8 max-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-white">Showing Properties</h2>
        {!hasSearched ? (
        <p className="text-center text-gray-200">🔍 Use the search bar above to find hotels.</p>
          ) : loading ? (

          <p className="text-center text-gray-200">Loading hotels...</p>
        ) : filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHotels.map((hotel) => {
              const images = hotel.images || [];
              const currentIndex = mainImages[hotel._id] || 0;

              const nextImage = () => {
                setMainImages((prev) => ({
                  ...prev,
                  [hotel._id]: (currentIndex + 1) % images.length,
                }));
              };

              const prevImage = () => {
                setMainImages((prev) => ({
                  ...prev,
                  [hotel._id]: (currentIndex - 1 + images.length) % images.length,
                }));
              };

              return (
                <motion.div
                  key={hotel._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-lg shadow-lg p-4 flex flex-col overflow-hidden"
                >
                  <div className="relative">
                    {images.length ? (
                      <>
                        <motion.img
                          key={images[currentIndex]}
                          src={images[currentIndex]}
                          alt="Hotel"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="w-full h-48 object-cover rounded"
                        />
                        {/* Navigation buttons */}
                        {images.length > 1 && (
                          <>
                            <div className="absolute inset-0 flex justify-between items-center px-2">
                              <button
                                onClick={prevImage}
                                className="bg-white text-black rounded-full px-2 py-1 shadow hover:bg-gray-100"
                              >
                                ◀
                              </button>
                              <button
                                onClick={nextImage}
                                className="bg-white text-black rounded-full px-2 py-1 shadow hover:bg-gray-100"
                              >
                                ▶
                              </button>
                            </div>
                            {/* Dot Indicators */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                              {images.map((_, idx) => (
                                <span
                                  key={idx}
                                  className={`w-2 h-2 rounded-full ${
                                    idx === currentIndex ? "bg-blue-600" : "bg-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="h-48 bg-gray-300 flex items-center justify-center text-gray-500">
                        No image
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow-md text-gray-800 text-sm">
                      ⭐ {hotel.rating} / 5
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold">{hotel.hotelName}</h3>
                    <p className="text-gray-600">{hotel.location}</p>
                    <p className="text-green-600 font-bold">
                      ₹{hotel.pricePerNight} / night
                    </p>
                    <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    >
                    <Link
                    to="/payment"
                    state={{
                    amount: hotel.pricePerNight,
                    type: "Hotel",
                    id: hotel._id,
                    }}
                    className="mt-4 block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                     Book Now
                    </Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-200">No hotels available.</p>
        )}
      </div>
    </div>
  );
};

export default Hotel;
