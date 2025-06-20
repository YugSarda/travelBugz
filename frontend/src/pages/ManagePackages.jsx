import React, { useEffect, useState } from "react";
import { getPackages, updatePackage, createPackage, deletePackage } from "../api/packageService";

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  const [formData, setFormData] = useState({
    packageName: "",
    place: "",
    duration: "",
    price: "",
    description: "",
    image: "",
  });

  // ✅ Fetch Packages on Mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true); // ✅ Show loading while fetching
    try {
      const response = await getPackages();
      if (!response || !Array.isArray(response)) {
        console.error("Invalid API response:", response);
        setPackages([]);
        return;
      }
      setPackages(response);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setPackages([]);
    } finally {
      setLoading(false); // ✅ Hide loading after fetch
    }
  };

  // ✅ Update filtered packages when `packages` or `searchTerm` changes
  useEffect(() => {
    setFilteredPackages(
      packages.filter((pkg) =>
        pkg.place.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [packages, searchTerm]);

  // ✅ Handle Search Input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Edit
  const handleEdit = (pkg) => {
    setFormData(pkg);
    setEditingId(pkg._id);
  };

  // ✅ Handle Create / Update Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePackage(editingId, formData);
      } else {
        await createPackage(formData);
      }
      fetchPackages();
      setFormData({
        packageName: "",
        place: "",
        duration: "",
        price: "",
        description: "",
        image: "",
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      await deletePackage(id);
      fetchPackages();
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Manage Packages</h2>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="Search by Destination..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded shadow-sm"
      />

      {/* ✅ Loading State */}
      {loading && <p className="text-center text-gray-500">Loading packages...</p>}

      {/* ✅ Package List */}
      <ul className="space-y-4">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg) => (
            <li
              key={pkg._id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{pkg.packageName}</h3>
                <p>
                  <strong>Destination:</strong> {pkg.place}
                </p>
                <p>
                  <strong>Price:</strong> ${pkg.price}
                </p>
                <p>
                  <strong>Duration:</strong> {pkg.duration} days
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(pkg)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No packages available.</p>
        )}
      </ul>

      {/* ✅ Add / Edit Package Form */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold mb-2">
          {editingId ? "Edit Package" : "Add New Package"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="packageName"
              value={formData.packageName}
              onChange={handleChange}
              placeholder="Package Name"
              required
              className="p-2 border rounded"
            />

            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              placeholder="Destination"
              required
              className="p-2 border rounded"
            />

            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration (days)"
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

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="p-2 border rounded col-span-2"
            />

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL (optional)"
              className="p-2 border rounded col-span-2"
            />
          </div>

          {/* ✅ Submit Button */}
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            {editingId ? "Save Changes" : "Add Package"}
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

export default ManagePackages;

