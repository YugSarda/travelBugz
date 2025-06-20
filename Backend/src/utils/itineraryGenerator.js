
// import Amadeus from 'amadeus';
// import dotenv from 'dotenv';
// dotenv.config();

// const amadeus = new Amadeus({
//   clientId: process.env.AMADEUS_API_KEY,
//   clientSecret: process.env.AMADEUS_API_SECRET
// });

// export const generateItinerary = async (destination, days = 3, preferences = {}) => {
//   try {
//     console.log(`Generating itinerary for: ${destination}`);
    
//     // Step 1: Get city information and IATA code
//     const locationResponse = await amadeus.referenceData.locations.get({
//       keyword: destination,
//       subType: 'CITY,AIRPORT'
//     });

//     if (!locationResponse.data || locationResponse.data.length === 0) {
//       throw new Error(`No location found for: ${destination}`);
//     }

//     const location = locationResponse.data[0];
//     const cityCode = location.iataCode;
//     const cityName = location.name;
//     const countryCode = location.address?.countryCode;

//     console.log(`Found city: ${cityName} (${cityCode})`);

//     // Step 2: Get Points of Interest (Activities)
//     let activities = [];
//     try {
//       const poiResponse = await amadeus.shopping.activities.get({
//         locationCode: cityCode,
//         radius: 20 // 20km radius
//       });
      
//       activities = poiResponse.data || [];
//       console.log(`Found ${activities.length} activities`);
//     } catch (activityError) {
//       console.warn('Activities API failed, using fallback method');
//       // Fallback: Create generic activities based on city type
//       activities = generateFallbackActivities(cityName, countryCode);
//     }

//     // Step 3: Try to get hotel information for accommodation suggestions
//     let hotels = [];
//     try {
//       const hotelResponse = await amadeus.shopping.hotelOffers.get({
//         cityCode: cityCode,
//         adults: 1,
//         checkInDate: '2025-07-01', // Example date
//         checkOutDate: '2025-07-04'
//       });
      
//       hotels = hotelResponse.data?.slice(0, 3) || [];
//     } catch (hotelError) {
//       console.warn('Hotel API failed, continuing without hotel suggestions');
//     }

//     // Step 4: Generate structured itinerary
//     const itinerary = generateStructuredItinerary(activities, days, preferences);
    
//     // Step 5: Add additional travel information as metadata
//     const travelInfo = {
//       destination: {
//         city: cityName,
//         country: location.address?.countryName || 'Unknown',
//         iataCode: cityCode,
//         coordinates: {
//           latitude: location.geoCode?.latitude,
//           longitude: location.geoCode?.longitude
//         }
//       },
//       accommodationSuggestions: formatHotelSuggestions(hotels),
//       travelTips: generateTravelTips(cityName, countryCode),
//       generatedAt: new Date().toISOString()
//     };

//     // Return itinerary array directly for backward compatibility
//     return itinerary.map(day => ({
//       ...day,
//       _metadata: travelInfo // Include additional info as metadata
//     }));

//   } catch (error) {
//     console.error('Amadeus API error:', error.response?.data || error.message);
    
//     // Provide a fallback response even if API fails
//     return generateFallbackItinerary(destination, days);
//   }
// };

// // Helper function to generate structured itinerary
// function generateStructuredItinerary(activities, days, preferences) {
//   const itinerary = [];
//   const totalActivities = activities.length;
//   const activitiesPerDay = Math.max(3, Math.floor(totalActivities / days));
  
//   for (let day = 1; day <= days; day++) {
//     const startIndex = (day - 1) * activitiesPerDay;
//     const endIndex = day === days ? totalActivities : day * activitiesPerDay;
    
//     const dayActivities = activities
//       .slice(startIndex, endIndex)
//       .map(activity => {
//         const name = activity.name || `Activity ${day}`;
//         const description = activity.shortDescription || activity.description || 'Explore this amazing location';
//         return `${name} - ${description}`;
//       });

//     // Add time-specific activities
//     if (day === 1) {
//       dayActivities.push('Welcome lunch at a local restaurant');
//       dayActivities.push('Evening: Explore nearby markets and street food');
//     } else if (day === days && days > 1) {
//       dayActivities.push('Last-minute shopping for souvenirs');
//       dayActivities.push('Farewell dinner at a recommended restaurant');
//     } else {
//       dayActivities.push(`Lunch break at a traditional ${activities[0]?.name?.split(' ')[0] || 'local'} restaurant`);
//       dayActivities.push('Evening leisure time and local exploration');
//     }
    
//     itinerary.push({
//       day: day,
//       activities: dayActivities
//     });
//   }
  
//   return itinerary;
// }

// // Fallback activities when API fails - City-specific attractions
// function generateFallbackActivities(cityName, countryCode) {
//   const cityAttractions = getCitySpecificAttractions(cityName.toUpperCase());
  
//   if (cityAttractions.length > 0) {
//     return cityAttractions;
//   }
  
//   // Generic fallback if city not found
//   return [
//     {
//       name: `${cityName} City Walking Tour`,
//       shortDescription: `Explore the historic center and main attractions of ${cityName}`
//     },
//     {
//       name: 'Local Museum Visit',
//       shortDescription: 'Discover the local history and culture'
//     },
//     {
//       name: 'Traditional Restaurant Experience',
//       shortDescription: 'Taste authentic local cuisine'
//     },
//     {
//       name: 'Shopping District Tour',
//       shortDescription: 'Browse local markets and shops'
//     },
//     {
//       name: 'Scenic Viewpoint Visit',
//       shortDescription: 'Enjoy panoramic views of the city'
//     },
//     {
//       name: 'Local Park or Garden',
//       shortDescription: 'Relax in natural surroundings'
//     }
//   ];
// }

// // City-specific attractions database
// function getCitySpecificAttractions(cityName) {
//   const cityAttractions = {
//     'MUMBAI': [
//       { name: 'Gateway of India', shortDescription: 'Iconic colonial archway monument overlooking the Arabian Sea' },
//       { name: 'Marine Drive', shortDescription: 'Famous seafront promenade, perfect for evening walks and sunset views' },
//       { name: 'Juhu Beach', shortDescription: 'Popular beach destination with street food and Bollywood celebrity homes nearby' },
//       { name: 'Chhatrapati Shivaji Terminus (CST)', shortDescription: 'UNESCO World Heritage railway station with stunning Victorian architecture' },
//       { name: 'Elephanta Caves', shortDescription: 'Ancient rock-cut caves dedicated to Lord Shiva (ferry ride from Gateway)' },
//       { name: 'Crawford Market', shortDescription: 'Bustling traditional market for spices, fruits, and local goods' },
//       { name: 'Haji Ali Dargah', shortDescription: 'Beautiful mosque and tomb on a tiny islet in the Arabian Sea' },
//       { name: 'Bandra-Worli Sea Link', shortDescription: 'Spectacular cable-stayed bridge offering panoramic city views' },
//       { name: 'Colaba Causeway', shortDescription: 'Famous shopping street with boutiques, cafes, and street vendors' },
//       { name: 'Chowpatty Beach', shortDescription: 'Historic beach famous for bhel puri and Mumbai street food culture' }
//     ],
//     'DELHI': [
//       { name: 'Red Fort (Lal Qila)', shortDescription: 'Magnificent Mughal fortress and UNESCO World Heritage Site' },
//       { name: 'India Gate', shortDescription: 'War memorial and iconic landmark in the heart of New Delhi' },
//       { name: 'Qutub Minar', shortDescription: 'Tallest brick minaret in the world, UNESCO World Heritage Site' },
//       { name: 'Lotus Temple', shortDescription: 'Stunning Baháʼí House of Worship shaped like a lotus flower' },
//       { name: 'Humayun\'s Tomb', shortDescription: 'Beautiful Mughal architecture and precursor to the Taj Mahal' },
//       { name: 'Chandni Chowk', shortDescription: 'Historic market area with traditional food, spices, and shopping' },
//       { name: 'Akshardham Temple', shortDescription: 'Magnificent Hindu temple complex with cultural exhibitions' },
//       { name: 'Raj Ghat', shortDescription: 'Memorial to Mahatma Gandhi in a peaceful garden setting' },
//       { name: 'Connaught Place', shortDescription: 'Central business district with shopping, dining, and colonial architecture' },
//       { name: 'Jama Masjid', shortDescription: 'One of India\'s largest mosques with stunning Mughal architecture' }
//     ],
//     'KOLKATA': [
//       { name: 'Victoria Memorial', shortDescription: 'Grand marble monument dedicated to Queen Victoria with gardens' },
//       { name: 'Howrah Bridge', shortDescription: 'Iconic cantilever bridge over the Hooghly River' },
//       { name: 'Dakshineswar Kali Temple', shortDescription: 'Historic Hindu temple dedicated to Goddess Kali' },
//       { name: 'Park Street', shortDescription: 'Famous food street with restaurants, pubs, and nightlife' },
//       { name: 'Sundarbans National Park', shortDescription: 'UNESCO site famous for Royal Bengal Tigers and mangrove forests' },
//       { name: 'New Market', shortDescription: 'Historic shopping area for clothes, accessories, and local goods' }
//     ],
//     'BANGALORE': [
//       { name: 'Lalbagh Botanical Garden', shortDescription: 'Historic botanical garden with diverse flora and Glass House' },
//       { name: 'Bangalore Palace', shortDescription: 'Tudor-style palace with beautiful architecture and gardens' },
//       { name: 'Cubbon Park', shortDescription: 'Large green lung in the city center, perfect for morning walks' },
//       { name: 'ISKCON Temple', shortDescription: 'Beautiful Krishna temple with stunning architecture' },
//       { name: 'UB City Mall', shortDescription: 'Luxury shopping and dining destination' },
//       { name: 'Commercial Street', shortDescription: 'Popular shopping street for fashion, accessories, and local items' }
//     ],
//     'CHENNAI': [
//       { name: 'Marina Beach', shortDescription: 'One of the longest beaches in the world, perfect for evening walks' },
//       { name: 'Kapaleeshwarar Temple', shortDescription: 'Ancient Dravidian temple dedicated to Lord Shiva' },
//       { name: 'Fort St. George', shortDescription: 'Historic British fort and museum showcasing colonial history' },
//       { name: 'San Thome Cathedral', shortDescription: 'Beautiful neo-Gothic basilica built over St. Thomas\'s tomb' },
//       { name: 'Express Avenue Mall', shortDescription: 'Modern shopping and entertainment complex' },
//       { name: 'Mahabalipuram', shortDescription: 'UNESCO World Heritage site with ancient rock-cut temples (day trip)' }
//     ],
//     'GURGAON': [
//       { name: 'Kingdom of Dreams', shortDescription: 'Entertainment destination showcasing Indian culture and performances' },
//       { name: 'Cyber Hub', shortDescription: 'Modern dining and entertainment complex with rooftop restaurants' },
//       { name: 'Sheetla Mata Mandir', shortDescription: 'Historic temple dedicated to Goddess Sheetla Mata' },
//       { name: 'Ambience Mall', shortDescription: 'Large shopping mall with brands, food court, and entertainment' },
//       { name: 'Leisure Valley Park', shortDescription: 'Green belt perfect for morning walks and outdoor activities' }
//     ]
//   };

//   return cityAttractions[cityName] || [];
// }

// // Generate meal suggestions
// function generateMealSuggestions(day) {
//   return {
//     breakfast: day === 1 ? 'Hotel breakfast or local café' : 'Local breakfast specialties',
//     lunch: 'Traditional local restaurant',
//     dinner: day === 1 ? 'Welcome dinner at recommended restaurant' : 'Explore local dining scene'
//   };
// }

// // Generate day-specific tips
// function generateDayTips(day, totalDays) {
//   if (day === 1) {
//     return ['Check in to accommodation early if possible', 'Get local SIM card or WiFi info', 'Exchange currency if needed'];
//   } else if (day === totalDays) {
//     return ['Check out times for accommodation', 'Plan departure logistics', 'Buy souvenirs'];
//   } else {
//     return ['Start early to avoid crowds', 'Carry water and snacks', 'Keep emergency contacts handy'];
//   }
// }

// // Format hotel suggestions
// function formatHotelSuggestions(hotels) {
//   return hotels.map(hotel => ({
//     name: hotel.hotel?.name || 'Local Hotel',
//     rating: hotel.hotel?.rating || 'Not rated',
//     price: hotel.offers?.[0]?.price ? 
//       `${hotel.offers[0].price.total} ${hotel.offers[0].price.currency}` : 
//       'Price on request',
//     location: hotel.hotel?.address || 'City center'
//   }));
// }

// // Generate travel tips based on city
// function generateTravelTips(cityName, countryCode) {
//   const citySpecificTips = {
//     'MUMBAI': [
//       'Use local trains for efficient city travel, but avoid rush hours (9-11 AM, 6-9 PM)',
//       'Try street food at Mohammed Ali Road and Juhu Beach',
//       'Carry cash as many local vendors don\'t accept cards',
//       'Book Elephanta Caves ferry tickets in advance during peak season',
//       'Monsoon season (June-September) can cause heavy flooding'
//     ],
//     'DELHI': [
//       'Use Delhi Metro for convenient city transportation',
//       'Best time to visit is October to March (pleasant weather)',
//       'Dress modestly when visiting religious sites',
//       'Try street food at Chandni Chowk and Connaught Place',
//       'Air quality can be poor, especially in winter months'
//     ],
//     'KOLKATA': [
//       'Try the famous fish curry and rice, and Bengali sweets',
//       'Use yellow taxis and auto-rickshaws for local transport',
//       'Visit during Durga Puja festival for cultural experience',
//       'Book Sundarbans tour in advance for tiger spotting',
//       'Carry umbrella during monsoon season (June-September)'
//     ],
//     'BANGALORE': [
//       'Pleasant weather year-round, perfect for outdoor activities',
//       'Try South Indian breakfast at local eateries',
//       'Traffic can be heavy, plan extra travel time',
//       'Pub culture is vibrant, especially on Brigade Road',
//       'IT hub with many co-working spaces and cafes'
//     ],
//     'CHENNAI': [
//       'Best time to visit is November to February',
//       'Try authentic South Indian cuisine and filter coffee',
//       'Marina Beach is perfect for evening walks',
//       'Auto-rickshaws are the primary mode of local transport',
//       'Summer months (April-June) can be extremely hot'
//     ]
//   };

//   return citySpecificTips[cityName.toUpperCase()] || [
//     'Check visa requirements before travel',
//     'Research local customs and etiquette',
//     'Download offline maps for navigation',
//     'Keep copies of important documents',
//     'Check weather forecast and pack accordingly'
//   ];
// }

// // Complete fallback itinerary with city-specific content
// function generateFallbackItinerary(destination, days) {
//   const cityAttractions = getCitySpecificAttractions(destination.toUpperCase());
//   const fallbackItinerary = [];
  
//   // If we have city-specific attractions, use them
//   if (cityAttractions.length > 0) {
//     const activitiesPerDay = Math.max(3, Math.floor(cityAttractions.length / days));
    
//     for (let day = 1; day <= days; day++) {
//       const startIndex = (day - 1) * activitiesPerDay;
//       const endIndex = day === days ? cityAttractions.length : day * activitiesPerDay;
      
//       const dayAttractions = cityAttractions.slice(startIndex, endIndex);
//       const activities = dayAttractions.map(attraction => 
//         `${attraction.name} - ${attraction.shortDescription}`
//       );
      
//       // Add meals and activities
//       if (day === 1) {
//         activities.push(`Welcome to ${destination}! Traditional lunch at a local restaurant`);
//         activities.push('Evening exploration of local markets and street food');
//       } else if (day === days && days > 1) {
//         activities.push('Souvenir shopping at local markets');
//         activities.push('Farewell dinner featuring local specialties');
//       } else {
//         activities.push('Lunch at a traditional restaurant');
//         activities.push('Free time for personal exploration');
//       }
      
//       fallbackItinerary.push({
//         day: day,
//         activities: activities
//       });
//     }
//   } else {
//     // Generic fallback for unknown cities
//     for (let day = 1; day <= days; day++) {
//       const activities = [
//         `${destination} City Highlights Tour - Explore the main attractions and landmarks`,
//         'Local Cuisine Experience - Try traditional dishes at recommended restaurants',
//         `Shopping in ${destination} - Browse local markets and souvenir shops`,
//         'Cultural Site Visit - Discover the local history and heritage'
//       ];
      
//       if (day === 1) {
//         activities.push('Check-in to accommodation and get oriented');
//         activities.push('Evening walk in the city center');
//       }
//       if (day === days) {
//         activities.push('Pack and prepare for departure');
//       }
      
//       fallbackItinerary.push({
//         day: day,
//         activities: activities
//       });
//     }
//   }
  
//   return fallbackItinerary;
// }

// // Additional utility function for advanced search
// export const searchFlights = async (origin, destination, departureDate, returnDate = null) => {
//   try {
//     const searchParams = {
//       originLocationCode: origin,
//       destinationLocationCode: destination,
//       departureDate: departureDate,
//       adults: 1
//     };
    
//     if (returnDate) {
//       searchParams.returnDate = returnDate;
//     }
    
//     const response = await amadeus.shopping.flightOffers.get(searchParams);
    
//     return response.data.slice(0, 5).map(offer => ({
//       price: `${offer.price.total} ${offer.price.currency}`,
//       airline: offer.itineraries[0].segments[0].carrierCode,
//       duration: offer.itineraries[0].duration,
//       departure: offer.itineraries[0].segments[0].departure,
//       arrival: offer.itineraries[0].segments[0].arrival
//     }));
    
//   } catch (error) {
//     console.error('Flight search error:', error);
//     return [];
//   }
// };
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
