import axios from 'axios';

export const fetchItinerary = async (formData) => {
  const response = await axios.post('http://localhost:5001/api/itinerary', formData);
  return response.data;
};
