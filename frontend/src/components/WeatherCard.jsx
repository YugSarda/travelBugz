// import React from 'react';

// const WeatherCard = ({ weatherData }) => {
//   if (!weatherData || !Array.isArray(weatherData)) {
//     return (
//       <div className="bg-white p-4 rounded-lg shadow">
//         <p className="text-gray-500">No weather data available.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//       {weatherData.map((day, index) => (
//         <div key={index} className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold">{day.date}</h3>
//           <p>{day.description}</p>
//           <p>Temp: {day.temp}°C</p>
//           <p>Wind: {day.wind} km/h</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default WeatherCard;
import React from 'react';

const WeatherCard = ({ weatherData }) => {
  if (
    !weatherData ||
    typeof weatherData !== 'object' ||
    !('location' in weatherData)
  ) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-500">No weather data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">
        🌤 Weather in {weatherData.location}
      </h2>
      <p className="text-lg mb-1">Temperature: {weatherData.temp}°C</p>
      <p className="text-md text-gray-600">Condition: {weatherData.condition}</p>
      <div className="mt-4">
        <h4 className="font-semibold mb-1">🧳 Packing Tips:</h4>
        <ul className="list-disc pl-6 text-gray-700 text-sm">
          {weatherData.packingTips?.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherCard;
