
import { generateItinerary } from '../utils/itineraryGenerator.js';

export const getItinerary = async (req, res) => {
  const { destination, days } = req.body;

  if (!destination || !days) {
    return res.status(400).json({ error: 'Destination and number of days are required.' });
  }

  try {
    const itinerary = await generateItinerary(destination, parseInt(days));
    res.json({ itinerary });
  } catch (err) {
    console.error('❌ AI itinerary generation failed:', err.message);
    res.status(500).json({ error: 'Failed to generate itinerary.' });
  }
};
