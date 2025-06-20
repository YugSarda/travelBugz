import axios from 'axios';
export const getWeatherAndPacking = async (req, res) => {

  try {
    const { location } = req.body;
    console.log('📍 Weather Request for:', location);

    if (!location) {
      return res.status(400).json({ message: 'Location is required' });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: 'Missing WEATHER_API_KEY in .env' });
    }

    const weatherURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    const weatherRes = await axios.get(weatherURL);

    const temp = weatherRes.data.current.temp_c;
    const condition = weatherRes.data.current.condition.text;
    
    const cityName = weatherRes.data.location.name;
    const isRain = condition.toLowerCase().includes("rain");

    const packingTips = [
      temp < 15 ? "Pack warm clothes 🧥" : "Pack light clothes 👕",
      isRain ? "Don't forget an umbrella ☔" : "Looks sunny! 😎"
    ];

    res.json({
      location:cityName,
      temp,
      condition,
      packingTips
    });

  } catch (err) {
    console.error('❌ WEATHER FETCH ERROR:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
