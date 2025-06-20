import React, { useEffect, useState } from "react";
import { getHotels, createHotel, updateHotel, deleteHotel } from "../api/hotelService";

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    hotelName: "",
    location: "",
    pricePerNight: "",
    rating: "",
    availableRooms: "",
    images: [], // Array to hold image URLs
  });

  // ✅ Fetch Hotels on Mount
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await getHotels();
      if (!response || !Array.isArray(response)) {
        console.error("Invalid API response:", response);
        setHotels([]);
        return;
      }
      setHotels(response);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update filtered hotels when `hotels` or `searchTerm` changes
  useEffect(() => {
    setFilteredHotels(
      hotels.filter((hotel) =>
        hotel.hotelName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [hotels, searchTerm]);

  // ✅ Handle Search Input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle image URLs as an array (comma-separated input)
    if (name === "images") {
      setFormData({ ...formData, images: value.split(",").map((img) => img.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle Edit
  const handleEdit = (hotel) => {
    setFormData({
      hotelName: hotel.hotelName,
      location: hotel.location,
      pricePerNight: hotel.pricePerNight,
      rating: hotel.rating,
      availableRooms: hotel.availableRooms,
      images: hotel.images || [],
    });
    setEditingId(hotel._id);
  };

  // ✅ Handle Create / Update Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        pricePerNight: Number(formData.pricePerNight),
        rating: Number(formData.rating),
        availableRooms: Number(formData.availableRooms),
      };

      if (editingId) {
        await updateHotel(editingId, updatedFormData);
      } else {
        await createHotel(updatedFormData);
      }
      fetchHotels();
      setFormData({
        hotelName: "",
        location: "",
        pricePerNight: "",
        rating: "",
        availableRooms: "",
        images: [],
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving hotel:", error);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await deleteHotel(id);
      fetchHotels();
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Manage Hotels</h2>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search by Hotel Name..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded shadow-sm"
      />

      {/* ✅ Loading State */}
      {loading && <p className="text-center text-gray-500">Loading hotels...</p>}

      {/* ✅ Hotel List */}
      <ul className="space-y-4">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <li
              key={hotel._id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{hotel.hotelName}</h3>
                <p><strong>Location:</strong> {hotel.location}</p>
                <p><strong>Rating:</strong> {hotel.rating} ⭐</p>
                <p><strong>Price per Night:</strong> ${hotel.pricePerNight}</p>
                <p><strong>Available Rooms:</strong> {hotel.availableRooms}</p>
                <p><strong>Images:</strong> {hotel.images.join(", ")}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(hotel)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(hotel._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No hotels available.</p>
        )}
      </ul>

      {/* ✅ Add / Edit Hotel Form */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold mb-2">
          {editingId ? "Edit Hotel" : "Add New Hotel"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="hotelName" value={formData.hotelName} onChange={handleChange} placeholder="Hotel Name" required className="p-2 border rounded" />
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required className="p-2 border rounded" />
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating (1-5)" required className="p-2 border rounded" />
            <input type="number" name="pricePerNight" value={formData.pricePerNight} onChange={handleChange} placeholder="Price per Night" required className="p-2 border rounded" />
            <input type="number" name="availableRooms" value={formData.availableRooms} onChange={handleChange} placeholder="Available Rooms" required className="p-2 border rounded" />
            <input type="text" name="images" value={formData.images.join(", ")} onChange={handleChange} placeholder="Image URLs (comma-separated)" className="p-2 border rounded" />
          </div>

          {/* ✅ Submit Button */}
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            {editingId ? "Save Changes" : "Add Hotel"}
          </button>

          {/* ✅ Cancel Button */}
          {editingId && <button type="button" onClick={() => setEditingId(null)} className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>}
        </form>
      </div>
    </div>
  );
};

export default ManageHotels;

