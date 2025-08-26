
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = 'openrouter/auto';

const API_KEY = process.env.OPENROUTER_API_KEY;

export const generateItinerary = async (destination, days = 3, preferences = '') => {
  const prompt = `
You are a travel planner AI. Create a ${days}-day travel itinerary for ${destination}.
Include:
- Daily overview (morning, afternoon, evening)
- 2–3 activities per day
- Meal suggestions
- 2–3 packing/travel tips

Output in JSON format ONLY:
{
  "itinerary": [
    {
      "day": 1,
      "title": "Day 1 - Explore Landmarks",
      "activities": ["Visit a landmark", "Go to a museum", "Evening food walk"],
      "meals": { "breakfast": "...", "lunch": "...", "dinner": "..." },
      "tips": ["Wear comfortable shoes", "Carry ID"]
    }
  ],
  "_metadata": {
    "destination": { "city": "${destination}", "country": "", "iatacode": "" },
    "travelTips": ["...", "..."],
    "generatedAt": "${new Date().toISOString()}"
  }
}
`.trim();

  try {
    console.log(`📍 Calling OpenRouter for: ${destination} (${days} days)`);

    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: OPENROUTER_MODEL,
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 120000
      }
    );

    const rawText = response.data.choices[0].message.content;

    // 🔍 Extract only the JSON part
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const jsonString = jsonMatch[0];
    const parsed = JSON.parse(jsonString);

    const itinerary = parsed.itinerary;
    const metadata = parsed._metadata;

    return itinerary.map(day => ({
      ...day,
      _metadata: metadata
    }));

  } catch (err) {
    console.error('❌ OpenRouter API error:', err.response?.data || err.message);
    throw new Error('Itinerary generation failed.');
  }
};
