// import { useEffect, useState } from 'react';
// import { fetchUserTrips } from '../api/groupTripService';
// import GroupTripForm from '../components/GroupTripForm';

// const GroupTripDashboard = () => {
//   const [trips, setTrips] = useState([]);

//   useEffect(() => {
//     const loadTrips = async () => {
//       const data = await fetchUserTrips();
//       setTrips(data);
//     };
//     loadTrips();
//   }, []);

//   return (
//     <div className="p-6">
//       <GroupTripForm onTripCreated={(trip) => setTrips([...trips, trip])} />

//       <h3 className="text-2xl font-bold mt-10 mb-4">Your Group Trips</h3>
//       <div className="grid md:grid-cols-2 gap-6">
//         {trips.map(trip => (
//           <div key={trip._id} className="bg-white p-4 shadow rounded">
//             <h4 className="text-lg font-semibold">{trip.tripName}</h4>
//             <p className="text-sm text-gray-600">{trip.destination}</p>
//             <p className="text-sm">{new Date(trip.startDate).toDateString()} - {new Date(trip.endDate).toDateString()}</p>
//             <p className="text-sm mt-1">Members: {trip.members.length}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GroupTripDashboard;
