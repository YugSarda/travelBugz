  
// import React, { useState } from 'react';
// import ItineraryForm from '../components/ItineraryForm';
// import ItineraryDisplay from '../components/ItineraryDisplay';
// import WeatherCard from '../components/WeatherCard';
// import { fetchItinerary } from '../api/itineraryService';
// import { fetchWeatherAndPacking } from '../api/weatherService';

// const ItineraryGeneratorPage = () => {
//   const [itinerary, setItinerary] = useState([]);
//   const [loading, setLoading] = useState(false);min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 py-10 px-6 md:px-12
//   const [submitted, setSubmitted] = useState(false);
//   const [weather, setWeather] = useState(null);

//   const handleSubmit = async (formData) => {
//     setLoading(true);
//     try {
//       const res = await fetchItinerary(formData);
//       setItinerary(res.itinerary || []);
//       setSubmitted(true);

//       const weatherData = await fetchWeatherAndPacking(formData.destination);
//       setWeather(weatherData);
//     } catch (error) {
//       alert('Failed to generate itinerary or weather');
//     }
//     setLoading(false);
//   };

//   const handleReset = () => {
//     setItinerary([]);
//     setWeather(null);
//     setSubmitted(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 py-12 px-6 md:px-16">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
//             ✈️ Plan Your Perfect Trip
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Enter your destination, and we’ll create a custom plan with weather insights 🌤️
//           </p>
//         </div>

//         {!submitted ? (
//           <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
//             <ItineraryForm onSubmit={handleSubmit} />
//           </div>
//         ) : loading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
//             <p className="text-xl font-semibold text-blue-700">Generating itinerary...</p>
//           </div>
//         ) : (
//           <>
//             <div className="flex justify-between items-center mt-10 mb-6">
//               <h2 className="text-3xl font-bold text-blue-900">🌍 Your Custom Travel Plan</h2>
//               <button
//                 onClick={handleReset}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
//               >
//                 Generate New
//               </button>
//             </div>

//             {/* Two Column Layout */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Itinerary */}
//               <div className="lg:col-span-2">
//                 <div className="bg-white p-6 rounded-xl shadow-lg">
//                   <h3 className="text-xl font-semibold text-blue-700 mb-4">🧭 Day-by-Day Plan</h3>
//                   <ItineraryDisplay itinerary={itinerary} weatherData={weather} />
//                 </div>
//               </div>

//               {/* Weather Card */}
//               {/* <div>
//                 <div className="bg-white p-6 rounded-xl shadow-lg">
//                   <h3 className="text-xl font-semibold text-blue-700 mb-4">🌤️ Weather & Packing Tips</h3>
//                   {weather ? (
//                     <WeatherCard weatherData={weather} />
//                   ) : (
//                     <p className="text-gray-500">No weather data available.</p>
//                   )}
//                 </div>
//               </div> */}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ItineraryGeneratorPage;
import React, { useState } from 'react';
import ItineraryForm from '../components/ItineraryForm';
import ItineraryDisplay from '../components/ItineraryDisplay';
import { fetchItinerary } from '../api/itineraryService';
import { fetchWeatherAndPacking } from '../api/weatherService';

const ItineraryGeneratorPage = () => {
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [weather, setWeather] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetchItinerary(formData);
      setItinerary(res.itinerary || []);
      const weatherData = await fetchWeatherAndPacking(formData.destination);
      setWeather(weatherData);
      setSubmitted(true);
    } catch (error) {
      alert('Failed to generate itinerary or weather');
    }
    setLoading(false);
  };

  const handleReset = () => {
    setItinerary([]);
    setWeather(null);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen p-6 bg-[#002b6b] flex items-center justify-center">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            🌍 Plan Your Custom Trip
          </h1>
          <p className="text-white text-lg">
            Enter destination & dates to get a full itinerary with weather insights
          </p>
        </div>

        {!submitted ? (
          <div className="bg-white shadow-2xl rounded-xl p-8 md:p-10 max-w-3xl mx-auto">
            <ItineraryForm onSubmit={handleSubmit} />
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
            <p className="text-xl font-semibold text-blue-700">Generating itinerary...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-blue-900">📅 Your Travel Itinerary</h2>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Generate New
              </button>
            </div>

            {/* Full Width Display */}
            <ItineraryDisplay itinerary={itinerary} weatherData={weather} />
          </>
        )}
      </div>
    </div>
  );
};

export default ItineraryGeneratorPage;
