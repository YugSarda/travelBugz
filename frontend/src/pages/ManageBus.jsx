import React, { useEffect, useState } from "react";
import { getBuses, createBus, updateBus, deleteBus } from "../api/busService";

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    busName: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    price: "",
    seatsAvailable: "",
  });

  // ✅ Fetch Buses on Mount
  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const response = await getBuses();
      if (!response || !Array.isArray(response)) {
        console.error("Invalid API response:", response);
        setBuses([]);
        return;
      }
      setBuses(response);
    } catch (error) {
      console.error("Error fetching buses:", error);
      setBuses([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update filtered buses when `buses` or `searchTerm` changes
  useEffect(() => {
    setFilteredBuses(
      buses.filter((bus) =>
        bus.busName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [buses, searchTerm]);

  // ✅ Handle Search Input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Edit
  const handleEdit = (bus) => {
    setFormData(bus);
    setEditingId(bus._id);
  };

  // ✅ Handle Create / Update Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateBus(editingId, formData);
      } else {
        await createBus(formData);
      }
      fetchBuses();
      setFormData({
        busName: "",
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
      console.error("Error saving bus:", error);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;
    try {
      await deleteBus(id);
      fetchBuses();
    } catch (error) {
      console.error("Error deleting bus:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Manage Buses</h2>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search by Bus Name..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded shadow-sm"
      />

      {/* ✅ Loading State */}
      {loading && <p className="text-center text-gray-500">Loading buses...</p>}

      {/* ✅ Bus List */}
      <ul className="space-y-4">
        {filteredBuses.length > 0 ? (
          filteredBuses.map((bus) => (
            <li
              key={bus._id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{bus.busName}</h3>
                <p>
                  <strong>Route:</strong> {bus.from} → {bus.to}
                </p>
                <p>
                  <strong>Departure Time:</strong> {bus.departureTime}
                </p>
                <p>
                  <strong>Arrival Time:</strong> {bus.arrivalTime}
                </p>
                <p>
                  <strong>Duration:</strong> {bus.duration}
                </p>
                <p>
                  <strong>Price:</strong> ₹{bus.price}
                </p>
                <p>
                  <strong>Seats Available:</strong> {bus.seatsAvailable}
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(bus)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(bus._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No buses available.</p>
        )}
      </ul>

      {/* ✅ Add / Edit Bus Form */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold mb-2">
          {editingId ? "Edit Bus" : "Add New Bus"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="busName"
              value={formData.busName}
              onChange={handleChange}
              placeholder="Bus Name"
              required
              className="p-2 border rounded"
            />

            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="From (Departure City)"
              required
              className="p-2 border rounded"
            />

            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="To (Arrival City)"
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
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration (HH:MM)"
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

          {/* ✅ Submit Button */}
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            {editingId ? "Save Changes" : "Add Bus"}
          </button>

          {/* ✅ Cancel Button (Only in Edit Mode) */}
          {editingId && (
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ManageBuses;

