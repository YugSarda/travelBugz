import axios from 'axios';

export const fetchWeatherAndPacking = async (destination) => {
  const response = await axios.post('/api/weather', { location: destination }); // ✅ use POST and pass destination
  return response.data;
};
