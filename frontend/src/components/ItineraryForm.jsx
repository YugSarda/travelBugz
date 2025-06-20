import { useState } from 'react';

const ItineraryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ destination: '', days: 1 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded">
      <h2 className="text-lg font-bold">Plan Your Trip</h2>
      <div>
        <label className="block mb-1">Destination</label>
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Days</label>
        <input
          type="number"
          name="days"
          min="1"
          value={formData.days}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Generate</button>
    </form>
  );
};

export default ItineraryForm;
