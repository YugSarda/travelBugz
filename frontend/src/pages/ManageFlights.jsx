import React, { useEffect, useState } from "react";
import { getFlights, createFlight, updateFlight, deleteFlight } from "../api/flightService";

const ManageFlights = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    airline: "",
    flightNumber: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    price: "",
    seatsAvailable: "",
  });

  // ✅ Fetch Flights on Mount
  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await getFlights();
      if (!response || !Array.isArray(response)) {
        console.error("Invalid API response:", response);
        setFlights([]);
        return;
      }
      setFlights(response);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update filtered flights when `flights` or `searchTerm` changes
  useEffect(() => {
    setFilteredFlights(
      flights.filter((flight) =>
        flight.airline.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [flights, searchTerm]);

  // ✅ Handle Search Input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Edit
  const handleEdit = (flight) => {
    setFormData(flight);
    setEditingId(flight._id);
  };

  // ✅ Handle Create / Update Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateFlight(editingId, formData);
      } else {
        await createFlight(formData);
      }
      fetchFlights();
      setFormData({
        airline: "",
        flightNumber: "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        duration: "",
        price: "",
        seatsAvailable: "",
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving flight:", error);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;
    try {
      await deleteFlight(id);
      fetchFlights();
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Manage Flights</h2>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search by Airline..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded shadow-sm"
      />

      {/* ✅ Loading State */}
      {loading && <p className="text-center text-gray-500">Loading flights...</p>}

      {/* ✅ Flight List */}
      <ul className="space-y-4">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <li
              key={flight._id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{flight.airline}</h3>
                <p>
                  <strong>Flight Number:</strong> {flight.flightNumber}
                </p>
                <p>
                  <strong>From:</strong> {flight.from}
                </p>
                <p>
                  <strong>To:</strong> {flight.to}
                </p>
                <p>
                  <strong>Departure:</strong> {flight.departureTime}
                </p>
                <p>
                  <strong>Arrival:</strong> {flight.arrivalTime}
                </p>
                <p>
                  <strong>Duration:</strong> {flight.duration} hours
                </p>
                <p>
                  <strong>Price:</strong> ${flight.price}
                </p>
                <p>
                  <strong>Seats Available:</strong> {flight.seatsAvailable}
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(flight)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(flight._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No flights available.</p>
        )}
      </ul>

      {/* ✅ Add / Edit Flight Form */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold mb-2">
          {editingId ? "Edit Flight" : "Add New Flight"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="airline"
              value={formData.airline}
              onChange={handleChange}
              placeholder="Airline Name"
              required
              className="p-2 border rounded"
            />

            <input
              type="text"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleChange}
              placeholder="Flight Number"
              required
              className="p-2 border rounded"
            />

            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Departure Location"
              required
              className="p-2 border rounded"
            />

            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Arrival Location"
              required
              className="p-2 border rounded"
            />

            <input
              type="text"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              placeholder="Departure Time"
              required
              className="p-2 border rounded"
            />

            <input
              type="text"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              placeholder="Arrival Time"
              required
              className="p-2 border rounded"
            />

            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration (hours)"
              required
              className="p-2 border rounded"
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="p-2 border rounded"
            />

            <input
              type="number"
              name="seatsAvailable"
              value={formData.seatsAvailable}
              onChange={handleChange}
              placeholder="Seats Available"
              required
              className="p-2 border rounded"
            />
          </div>

          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            {editingId ? "Save Changes" : "Add Flight"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageFlights;
