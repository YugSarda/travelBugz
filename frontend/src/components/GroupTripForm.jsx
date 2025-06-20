import { useState } from 'react';
import { createGroupTrip } from '../api/groupTripService';

const GroupTripForm = ({ onTripCreated }) => {
  const [form, setForm] = useState({
    tripName: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    memberEmails: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      memberEmails: form.memberEmails.split(',').map(email => email.trim())
    };
    try {
      const trip = await createGroupTrip(payload);
      onTripCreated(trip);
      alert('Group trip created!');
    } catch (err) {
      console.error(err);
      alert('Failed to create trip');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Group Trip</h2>
      {['tripName', 'destination', 'startDate', 'endDate', 'description'].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-sm font-semibold">{field}</label>
          <input
            type={field.includes('Date') ? 'date' : 'text'}
            name={field}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
      ))}
      <div className="mb-4">
        <label className="block text-sm font-semibold">Invite Members (comma-separated emails)</label>
        <input
          type="text"
          name="memberEmails"
          value={form.memberEmails}
          onChange={handleChange}
          placeholder="email1@example.com, email2@example.com"
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Trip
      </button>
    </form>
  );
};

export default GroupTripForm;
