// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Packages from "../pages/Packages";
// import Booking from "../pages/Booking";
// import NotFound from "../pages/NotFound";
// import AdminDashboard from "../pages/AdminDashboard";
// import UserDashboard from "../pages/UserDashboard";
// import ProtectedRoute from "../components/ProtectedRoute";
// import ManagePackages from "../pages/ManagePackages";
// import Flights from "../pages/Flights";
// import Train from "../pages/Train";
// import Bus from "../pages/Bus";
// import Hotel from "../pages/Hotel";
// import ManageFlights from "../pages/ManageFlights"
// import ManageBuses from "../pages/ManageBus";
// import ManageHotels from "../pages/ManageHotel";
// import ManageTrains from "../pages/ManageTrains";
// import Payment from "../pages/Payment";
// import ManageUsers from "../pages/ManageUsers";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/packages" element={<Packages />} />
//       <Route path="/booking" element={<Booking />} />
//       <Route path="*" element={<NotFound />} />
//       <Route path="/flights" element={<Flights/>} />
//       <Route path="/trains" element={<Train/>} />
//       <Route path="/buses" element={<Bus/>} />
//       <Route path="/hotels" element={<Hotel/>} />
//       <Route path="/payment" element={<Payment/>} />
//       <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
//         <Route path="/booking" element={<Booking />} />
//         <Route path="/user-dashboard" element={<UserDashboard />} />
//       </Route>
//       <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/admin/manage-packages" element={<ManagePackages />} />
//         <Route path="/admin/manage-flights" element={<ManageFlights />} />
//         <Route path="/admin/manage-buses" element={<ManageBuses />} />
//         <Route path="/admin/manage-hotels" element={<ManageHotels />} />
//         <Route path="/admin/manage-trains" element={<ManageTrains />} />
//         <Route path="/admin/manage-users" element={<ManageUsers />} />
//       </Route>
   
     
//     </Routes>
//   );
// };

// export default AppRoutes;
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Packages from "../pages/Packages";
import Booking from "../pages/Booking";
import NotFound from "../pages/NotFound";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import ManagePackages from "../pages/ManagePackages";
import Flights from "../pages/Flights";
import Train from "../pages/Train";
import Bus from "../pages/Bus";
import Hotel from "../pages/Hotel";
import ManageFlights from "../pages/ManageFlights"
import ManageBuses from "../pages/ManageBus";
import ManageHotels from "../pages/ManageHotel";
import ManageTrains from "../pages/ManageTrains";
import Payment from "../pages/Payment";
import ManageUsers from "../pages/ManageUsers";

import ItineraryGeneratorPage from '../pages/ItineraryGeneratorPage';
import ChatPage from "../pages/ChatPage";
// Import Recommendation Pages
// import GroupTripDashboard from "../pages/GroupTripDashboard";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/flights" element={<Flights/>} />
      <Route path="/trains" element={<Train/>} />
      <Route path="/buses" element={<Bus/>} />
      <Route path="/hotels" element={<Hotel/>} />
      <Route path="/payment" element={<Payment/>} />

      
      {/* Protected Routes for Users and Admins */}
      <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
        <Route path="/booking" element={<Booking />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        
      </Route>

      {/* Admin Only Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-packages" element={<ManagePackages />} />
        <Route path="/admin/manage-flights" element={<ManageFlights />} />
        <Route path="/admin/manage-buses" element={<ManageBuses />} />
        <Route path="/admin/manage-hotels" element={<ManageHotels />} />
        <Route path="/admin/manage-trains" element={<ManageTrains />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />

      </Route>
     
      <Route path="/itinerary" element={<ItineraryGeneratorPage />} />
      <Route path="*" element={<NotFound />} />
       <Route path="/chat" element={<ChatPage />} />
       {/* <Route path="/group-trips" element={<GroupTripDashboard />} /> */}
    </Routes>
  );
};

export default AppRoutes;