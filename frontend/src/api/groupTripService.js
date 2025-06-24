// import axios from 'axios';

// // ✅ Get token from localStorage
// const getAuthHeader = () => {
//   const token = localStorage.getItem('token'); // Or wherever you store your token
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
// };

// // ✅ POST request with token
// export const createGroupTrip = async (tripData) => {
//   const res = await axios.post('http://localhost:5001/api/group-trips/create', tripData, getAuthHeader());
//   return res.data;
// };

// // ✅ GET request with token
// export const fetchUserTrips = async () => {
//   const res = await axios.get('http://localhost:5001/api/group-trips', getAuthHeader());
//   return res.data;
// };
