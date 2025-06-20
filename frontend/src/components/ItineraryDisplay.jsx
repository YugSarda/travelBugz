
// import React from 'react';

// const ItineraryDisplay = ({ itinerary, weatherData, loading, error }) => {
//   if (loading) {
//     return (
//       <div className="mt-6 p-4 bg-gray-100 shadow-md rounded">
//         <div className="flex items-center justify-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2 text-gray-600">Generating your itinerary...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 shadow-md rounded">
//         <h2 className="text-xl font-semibold mb-2">Error</h2>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
//     return (
//       <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 shadow-md rounded">
//         <h2 className="text-xl font-semibold mb-2">No Itinerary</h2>
//         <p>No itinerary data available. Please try generating again.</p>
//       </div>
//     );
//   }

//   const metadata = itinerary[0]?._metadata;
//   const destination = metadata?.destination;

//   return (
//     <div className="mt-6">
//       {destination && (
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-bold text-blue-800">
//             ✈️ Trip to {destination.city}, {destination.country}
//           </h2>
//           <p className="text-gray-600 mt-1">
//             {destination.iataCode && `Airport: ${destination.iataCode}`} • {itinerary.length} {itinerary.length === 1 ? 'Day' : 'Days'}
//           </p>
//         </div>
//       )}

//       {/* Horizontal Flex Cards for Days */}
//       <div className="flex flex-wrap gap-6 justify-center">
//         {itinerary.map((day) => (
//           <div key={day.day} className="w-[320px] bg-white p-6 rounded-xl shadow-lg border border-blue-200">
//             <div className="flex items-center mb-4">
//               <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
//                 {day.day}
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">
//                 Day {day.day}
//                 {day.title && ` - ${day.title.split(' - ')[1]}`}
//               </h3>
//             </div>

//             <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
//               {day.activities.map((activity, index) => (
//                 <li key={index}>{activity}</li>
//               ))}
//             </ul>

//             {(day.meals || day.tips) && (
//               <div className="mt-4 pt-3 border-t border-gray-200 text-sm">
//                 {day.meals?.lunch && (
//                   <p className="text-gray-600 mb-1">
//                     🍽️ <strong>Meal:</strong> {day.meals.lunch}
//                   </p>
//                 )}
//                 {day.tips?.length > 0 && (
//                   <p className="text-gray-600">
//                     💡 <strong>Tips:</strong> {day.tips.join(' • ')}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Metadata + Weather Grid */}
//       {(metadata || weatherData) && (
//         <div className="mt-10 p-6 bg-gray-50 rounded-xl border shadow-sm">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-700">
//             {metadata?.travelTips?.length > 0 && (
//               <div>
//                 <h4 className="text-lg font-semibold text-blue-700 mb-2">🎯 Travel Tips</h4>
//                 <ul className="list-disc list-inside">
//                   {metadata.travelTips.slice(0, 3).map((tip, index) => (
//                     <li key={index}>{tip}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {metadata?.accommodationSuggestions?.length > 0 && (
//               <div>
//                 <h4 className="text-lg font-semibold text-blue-700 mb-2">🏨 Hotel Suggestions</h4>
//                 <ul className="list-disc list-inside">
//                   {metadata.accommodationSuggestions.slice(0, 2).map((hotel, index) => (
//                     <li key={index}>
//                       {hotel.name} - <span className="text-gray-500">{hotel.price}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {weatherData && (
//               <div>
//                 <h4 className="text-lg font-semibold text-blue-700 mb-2">🌤️ Weather Info</h4>
//                 <div className="bg-white p-4 rounded-md border shadow-sm">
//                   <p><strong>📍 Location:</strong> {weatherData.location}</p>
//                   <p><strong>🌡️ Temperature:</strong> {weatherData.temp}°C</p>
//                   <p><strong>🌥️ Condition:</strong> {weatherData.condition}</p>
//                   <p className="mt-2 font-semibold">🧳 Packing Tips:</p>
//                   <ul className="list-disc list-inside text-sm mt-1">
//                     {weatherData.packingTips?.map((tip, index) => (
//                       <li key={index}>{tip}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>

//           {metadata?.generatedAt && (
//             <div className="mt-6 text-center text-xs text-gray-400">
//               Generated on {new Date(metadata.generatedAt).toLocaleString()}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ItineraryDisplay;
// import React from 'react';

// const ItineraryDisplay = ({ itinerary, weatherData, loading, error }) => {
//   if (loading) {
//     return (
//       <div className="mt-6 p-4 bg-gray-100 shadow-md rounded">
//         <div className="flex items-center justify-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2 text-gray-600">Generating your itinerary...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 shadow-md rounded">
//         <h2 className="text-xl font-semibold mb-2">Error</h2>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
//     return (
//       <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 shadow-md rounded">
//         <h2 className="text-xl font-semibold mb-2">No Itinerary</h2>
//         <p>No itinerary data available. Please try generating again.</p>
//       </div>
//     );
//   }

//   const metadata = itinerary[0]?._metadata;
//   const destination = metadata?.destination;

//   return (
//     <div className="mt-6 w-full flex flex-col items-center">
//       {/* Destination Header */}
//       {destination && (
//         <div className="text-center mb-10">
//           <h2 className="text-3xl font-bold text-blue-800">
//             ✈️ Trip to {destination.city}, {destination.country}
//           </h2>
//           <p className="text-gray-600 mt-1">
//             {destination.iataCode && `Airport: ${destination.iataCode}`} • {itinerary.length} {itinerary.length === 1 ? 'Day' : 'Days'}
//           </p>
//         </div>
//       )}

//       {/* Day Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full max-w-6xl">
//         {itinerary.map((day) => (
//           <div key={day.day} className="w-full max-w-[320px] bg-white p-6 rounded-xl shadow-lg border border-blue-200">
//             <div className="flex items-center mb-4">
//               <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
//                 {day.day}
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">
//                 Day {day.day}
//                 {day.title && ` - ${day.title.split(' - ')[1]}`}
//               </h3>
//             </div>

//             <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
//               {day.activities.map((activity, index) => (
//                 <li key={index}>{activity}</li>
//               ))}
//             </ul>

//             {(day.meals || day.tips) && (
//               <div className="mt-4 pt-3 border-t border-gray-200 text-sm">
//                 {day.meals?.lunch && (
//                   <p className="text-gray-600 mb-1">
//                     🍽️ <strong>Meal:</strong> {day.meals.lunch}
//                   </p>
//                 )}
//                 {day.tips?.length > 0 && (
//                   <p className="text-gray-600">
//                     💡 <strong>Tips:</strong> {day.tips.join(' • ')}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Travel Tips / Hotel Suggestions / Weather */}
//       {(metadata || weatherData) && (
//         <div className="mt-12 w-full max-w-5xl px-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-700 text-left">
//             {/* Travel Tips */}
//             {metadata?.travelTips?.length > 0 && (
//               <div>
//                 <h4 className="text-lg font-semibold text-blue-700 mb-2">🎯 Travel Tips</h4>
//                 <ul className="list-disc list-inside">
//                   {metadata.travelTips.slice(0, 3).map((tip, index) => (
//                     <li key={index}>{tip}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Hotel Suggestions */}
//             {metadata?.accommodationSuggestions?.length > 0 && (
//               <div>
//                 <h4 className="text-lg font-semibold text-blue-700 mb-2">🏨 Hotel Suggestions</h4>
//                 <ul className="list-disc list-inside">
//                   {metadata.accommodationSuggestions.slice(0, 2).map((hotel, index) => (
//                     <li key={index}>
//                       {hotel.name} - <span className="text-gray-500">{hotel.price}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Weather Info */}
//             {weatherData && (
//               <div>
//                 <h4 className="text-lg font-semibold text-blue-700 mb-2">🌦️ Weather & Packing Tips</h4>
//                 <ul className="list-disc list-inside space-y-1">
//                   <li><strong>Location:</strong> {weatherData.location}</li>
//                   <li><strong>Temperature:</strong> {weatherData.temp}°C</li>
//                   <li><strong>Condition:</strong> {weatherData.condition}</li>
//                   {weatherData.packingTips?.map((tip, index) => (
//                     <li key={index}>{tip}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Generation Timestamp */}
//           {metadata?.generatedAt && (
//             <div className="mt-6 text-center text-xs text-gray-400">
//               Generated on {new Date(metadata.generatedAt).toLocaleString()}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ItineraryDisplay;
import React from 'react';

const ItineraryDisplay = ({ itinerary, weatherData, loading, error }) => {
  if (loading) {
    return (
      <div className="mt-6 p-4 bg-gray-100 shadow-md rounded">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Generating your itinerary...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 shadow-md rounded">
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
    return (
      <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 shadow-md rounded">
        <h2 className="text-xl font-semibold mb-2">No Itinerary</h2>
        <p>No itinerary data available. Please try generating again.</p>
      </div>
    );
  }

  const metadata = itinerary[0]?._metadata;
  const destination = metadata?.destination;

  return (
    <div className="mt-6 w-full flex flex-col items-center px-4">
      {/* Destination Header */}
      {destination && (
        <div className="text-center mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-blue-800">
            ✈️ Trip to {destination.city}, {destination.country}
          </h2>
          <p className="text-gray-600 mt-1">
            {destination.iataCode && `Airport: ${destination.iataCode}`} • {itinerary.length} {itinerary.length === 1 ? 'Day' : 'Days'}
          </p>
        </div>
      )}

      {/* Day Cards Grid */}
      <div className={`w-full max-w-6xl ${itinerary.length === 1 ? 'flex justify-center' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center'}`}>
        {itinerary.map((day) => (
          <div key={day.day} className="w-full max-w-[320px] bg-white p-6 rounded-xl shadow-lg border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                {day.day}
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Day {day.day}
                {day.title && ` - ${day.title.split(' - ')[1]}`}
              </h3>
            </div>

            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {day.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>

            {(day.meals || day.tips) && (
              <div className="mt-4 pt-3 border-t border-gray-200 text-sm">
                {day.meals?.lunch && (
                  <p className="text-gray-600 mb-1">
                    🍽️ <strong>Meal:</strong> {day.meals.lunch}
                  </p>
                )}
                {day.tips?.length > 0 && (
                  <p className="text-gray-600">
                    💡 <strong>Tips:</strong> {day.tips.join(' • ')}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Travel Tips / Hotel Suggestions / Weather */}
      {(metadata || weatherData) && (
        <div className="mt-12 w-full max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-6 justify-between">
            {/* Travel Tips */}
            {metadata?.travelTips?.length > 0 && (
              <div className="flex-1 bg-white p-4 rounded shadow-md border">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">🎯 Travel Tips</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {metadata.travelTips.slice(0, 3).map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hotel Suggestions */}
            {metadata?.accommodationSuggestions?.length > 0 && (
              <div className="flex-1 bg-white p-4 rounded shadow-md border">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">🏨 Hotel Suggestions</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {metadata.accommodationSuggestions.slice(0, 2).map((hotel, index) => (
                    <li key={index}>
                      {hotel.name} - <span className="text-gray-500">{hotel.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Weather Info */}
            {weatherData && (
              <div className="flex-1 bg-white p-4 rounded shadow-md border">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">🌦️ Weather & Packing Tips</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li><strong>Location:</strong> {weatherData.location}</li>
                  <li><strong>Temperature:</strong> {weatherData.temp}°C</li>
                  <li><strong>Condition:</strong> {weatherData.condition}</li>
                  {weatherData.packingTips?.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Generation Timestamp */}
          {metadata?.generatedAt && (
            <div className="mt-6 text-center text-xs text-gray-400">
              Generated on {new Date(metadata.generatedAt).toLocaleString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItineraryDisplay;
