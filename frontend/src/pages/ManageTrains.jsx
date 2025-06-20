import React, { useEffect, useState } from "react";
import { getTrains, createTrain, updateTrain, deleteTrain } from "../api/trainService";

const ManageTrains = () => {
  const [trains, setTrains] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    trainName: "",
    trainNumber: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    price: "",
    seatsAvailable: "",
  });

  // ✅ Fetch Trains on Mount
  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    setLoading(true);
    try {
      const response = await getTrains();
      if (!response || !Array.isArray(response)) {
        console.error("Invalid API response:", response);
        setTrains([]);
        return;
      }
      setTrains(response);
    } catch (error) {
      console.error("Error fetching trains:", error);
      setTrains([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update filtered trains when `trains` or `searchTerm` changes
  useEffect(() => {
    setFilteredTrains(
      trains.filter((train) =>
        train.trainName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [trains, searchTerm]);

  // ✅ Handle Search Input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Edit
  const handleEdit = (train) => {
    setFormData(train);
    setEditingId(train._id);
  };

  // ✅ Handle Create / Update Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTrain(editingId, formData);
      } else {
        await createTrain(formData);
      }
      fetchTrains();
      setFormData({
        trainName: "",
        trainNumber: "",
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
      console.error("Error saving train:", error);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this train?")) return;
    try {
      await deleteTrain(id);
      fetchTrains();
    } catch (error) {
      console.error("Error deleting train:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Manage Trains</h2>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search by Train Name..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded shadow-sm"
      />

      {/* ✅ Loading State */}
      {loading && <p className="text-center text-gray-500">Loading trains...</p>}

      {/* ✅ Train List */}
      <ul className="space-y-4">
        {filteredTrains.length > 0 ? (
          filteredTrains.map((train) => (
            <li
              key={train._id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{train.trainName}</h3>
                <p><strong>Train Number:</strong> {train.trainNumber}</p>
                <p><strong>From:</strong> {train.from}</p>
                <p><strong>To:</strong> {train.to}</p>
                <p><strong>Departure Time:</strong> {train.departureTime}</p>
                <p><strong>Arrival Time:</strong> {train.arrivalTime}</p>
                <p><strong>Duration:</strong> {train.duration}</p>
                <p><strong>Price:</strong> ${train.price}</p>
                <p><strong>Seats Available:</strong> {train.seatsAvailable}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(train)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(train._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No trains available.</p>
        )}
      </ul>

      {/* ✅ Add / Edit Train Form */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold mb-2">
          {editingId ? "Edit Train" : "Add New Train"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="trainName" value={formData.trainName} onChange={handleChange} placeholder="Train Name" required className="p-2 border rounded" />

            <input type="text" name="trainNumber" value={formData.trainNumber} onChange={handleChange} placeholder="Train Number" required className="p-2 border rounded" />

            <input type="text" name="from" value={formData.from} onChange={handleChange} placeholder="From" required className="p-2 border rounded" />

            <input type="text" name="to" value={formData.to} onChange={handleChange} placeholder="To" required className="p-2 border rounded" />

            <input type="text" name="departureTime" value={formData.departureTime} onChange={handleChange} placeholder="Departure Time (HH:MM AM/PM)" required className="p-2 border rounded" />

            <input type="text" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} placeholder="Arrival Time (HH:MM AM/PM)" required className="p-2 border rounded" />

            <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (e.g., 3h 45m)" required className="p-2 border rounded" />

            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required className="p-2 border rounded" />

            <input type="number" name="seatsAvailable" value={formData.seatsAvailable} onChange={handleChange} placeholder="Seats Available" required className="p-2 border rounded" />
          </div>

          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            {editingId ? "Save Changes" : "Add Train"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageTrains;
