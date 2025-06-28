// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const username = localStorage.getItem("username");
//   const userRole = localStorage.getItem("userRole");

//   const dashboardRoute = userRole === "admin" ? "/admin-dashboard" : "/user-dashboard";

//   return (
//     <nav className="bg-[#001f4d] text-white py-3 shadow-md">
//       <div className="flex items-center justify-between px-6">
//         {/* Left: Logo */}
//         <div className="flex items-center space-x-4">
//           <Link to="/" className="text-3xl font-bold">
//             TravelBugz
//           </Link>
//         </div>

//         {/* Center: Menu */}
//         <div className="flex-1 flex justify-center space-x-10 text-lg font-medium">
//           <Link to="/flights" className="hover:underline">Flights</Link>
//           <Link to="/hotels" className="hover:underline">Hotels</Link>
//           <Link to="/trains" className="hover:underline">Trains</Link>
//           <Link to="/buses" className="hover:underline">Buses</Link>
//           <Link to="/packages" className="hover:underline">Holiday Packages</Link>
        
// <Link to="/currency-converter" className="hover:underline">Currency Converter</Link>

//         </div>

//         {/* Right: Auth buttons */}
//         <div className="flex items-center space-x-3">
//           {token ? (
//             <button
//               onClick={() => navigate(dashboardRoute)}
//               className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1.5 rounded font-semibold text-base"
//             >
//               {username}
//             </button>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1.5 rounded font-semibold text-base"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1.5 rounded font-semibold text-base"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const userRole = localStorage.getItem("userRole");

  const dashboardRoute = userRole === "admin" ? "/admin-dashboard" : "/user-dashboard";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <nav className="bg-[#001f4d] text-white py-3 shadow-md">
      <div className="flex items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-3xl font-bold">
            TravelBugz
          </Link>
        </div>

        {/* Center: Menu */}
        <div className="flex-1 flex justify-center space-x-8 text-lg font-medium">
          <Link to="/flights" className="hover:underline hover:text-yellow-400 transition duration-200">
            Flights
          </Link>
          <Link to="/hotels" className="hover:underline hover:text-yellow-400 transition duration-200">
            Hotels
          </Link>
          <Link to="/trains" className="hover:underline hover:text-yellow-400 transition duration-200">
            Trains
          </Link>
          <Link to="/buses" className="hover:underline hover:text-yellow-400 transition duration-200">
            Buses
          </Link>
          <Link to="/packages" className="hover:underline hover:text-yellow-400 transition duration-200">
             Packages
          </Link>
           <Link to="/itinerary" className="hover:underline hover:text-yellow-400 transition duration-200">Itinerary</Link>
           <Link
                to="/group-trip"
                className= "hover:underline hover:text-yellow-400 transition duration-200"
              >
               groups
              </Link>
           <Link
  to="/chat"
  className="hover:underline hover:text-yellow-400 transition duration-200"
>
  Help
</Link>
 
        </div>

        {/* Right: Auth buttons */}
        <div className="flex items-center space-x-3">
          {token ? (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(dashboardRoute)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1.5 rounded font-semibold text-base transition duration-200"
              >
                {username}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded font-semibold text-base transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1.5 rounded font-semibold text-base transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1.5 rounded font-semibold text-base transition duration-200"
              >
                Register
              </Link>
              
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
