import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlaneDeparture, FaHotel, FaBus } from "react-icons/fa";
const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover  text-white font-sans"
      style={{
        backgroundImage: "url('/assets/bg-hero.png')",
        backgroundPosition: "top 35% center",
      }}
    >
      {/* 🔹 Hero Section with Overlay */}
      <div className="relative h-[90vh]">
        <div className="absolute inset-0 bg-[#001f4d]/0 flex flex-col justify-center items-start px-8 md:px-24">
          <motion.h1
            className="text-4xl md:text-7xl font-extrabold leading-tight animate-pulse text-white-400"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            Find Your Next <br /> Adventure
          </motion.h1>

          <p className="text-lg md:text-2xl mt-4">
            Book flights, hotels and trains at the best prices
          </p>

          <Link to="/booking">
            <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-bold text-2xl shadow-md">
              Explore Now
            </button>
          </Link>
        </div>
      </div>

      {/* 🔹 Feature Cards */}
      
      <div className="max-w-6xl mx-auto mt-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
  <Link to="/flights" className="block">
    <div className="bg-[#002a6d] bg-opacity-90 rounded-xl py-8 px-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
      <FaPlaneDeparture className="text-4xl mb-4" />
      <p className="text-lg font-semibold">Best Flight Deals</p>
    </div>
  </Link>

  <Link to="/hotels" className="block">
    <div className="bg-[#002a6d] bg-opacity-90 rounded-xl py-8 px-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
      <FaHotel className="text-4xl mb-4" />
      <p className="text-lg font-semibold">Luxury & Budget Hotels</p>
    </div>
  </Link>

  <Link to="/buses" className="block">
    <div className="bg-[#002a6d] bg-opacity-90 rounded-xl py-8 px-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
      <FaBus className="text-4xl mb-4" />
      <p className="text-lg font-semibold">Comfortable Bus Trips</p>
    </div>
  </Link>
</div>
<footer className="mt-20 bg-[#031B4E]/80 text-gray-300 text-center  py-14">
  <p className="text-xl mb-2">Made with ❤️ for Travelers</p>
  <p className="text-xl">© 2025 TravelNow. All rights reserved.</p>
</footer>
</div>

  );
};

export default Home;
// src/pages/Home.jsx (Updated with recommendations)
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaPlane, FaHotel, FaTrain, FaBus, FaGift, FaStar, FaArrowRight } from 'react-icons/fa';
// import RecommendationSection from '../components/RecommendationSection';
// import { getTrendingRecommendations, getPersonalizedRecommendations } from '../api/recommendationService';

// const Home = () => {
//   const [trendingRecs, setTrendingRecs] = useState([]);
//   const [personalizedRecs, setPersonalizedRecs] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Fixed storage access
//   const token = localStorage.getItem('token');
//   const username = localStorage.getItem('username');
//   const userRole = localStorage.getItem('userRole');
//   const email = localStorage.getItem('email');

//   useEffect(() => {
//     loadHomeRecommendations();
//   }, []);

//   const loadHomeRecommendations = async () => {
//     setLoading(true);
//     try {
//       // Load trending recommendations
//       const trending = await getTrendingRecommendations(6);
//       setTrendingRecs(trending);

//       // Load personalized recommendations if user is logged in
//       if (token && email) {
//         const personalized = await getPersonalizedRecommendations(email, 6);
//         setPersonalizedRecs(personalized);
//       }
//     } catch (error) {
//       console.error('Error loading recommendations:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const services = [
//     {
//       icon: <FaPlane className="text-3xl text-blue-600" />,
//       title: "Flights",
//       description: "Book domestic and international flights",
//       link: "/flights",
//       color: "bg-blue-50 hover:bg-blue-100"
//     },
//     {
//       icon: <FaHotel className="text-3xl text-green-600" />,
//       title: "Hotels",
//       description: "Find and book accommodations worldwide",
//       link: "/hotels",
//       color: "bg-green-50 hover:bg-green-100"
//     },
//     {
//       icon: <FaTrain className="text-3xl text-purple-600" />,
//       title: "Trains",
//       description: "Book train tickets for your journey",
//       link: "/trains",
//       color: "bg-purple-50 hover:bg-purple-100"
//     },
//     {
//       icon: <FaBus className="text-3xl text-orange-600" />,
//       title: "Buses",
//       description: "Comfortable bus travel options",
//       link: "/buses",
//       color: "bg-orange-50 hover:bg-orange-100"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               {username ? `Welcome back, ${username}!` : 'Your Journey Starts Here'}
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 text-blue-100">
//               Book flights, hotels, trains, and buses all in one place
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 to="/packages"
//                 className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
//               >
//                 Start Planning
//               </Link>
//               <Link
//                 to="/recommendations"
//                 className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
//               >
//                 View Recommendations <FaGift className="inline ml-2" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Book Your Travel Essentials
//             </h2>
//             <p className="text-lg text-gray-600">
//               Everything you need for your perfect trip
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {services.map((service, index) => (
//               <Link
//                 key={index}
//                 to={service.link}
//                 className={`${service.color} rounded-xl p-6 text-center transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
//               >
//                 <div className="flex justify-center mb-4">
//                   {service.icon}
                {/* </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center justify-center text-blue-600 font-medium">
                  Book Now <FaArrowRight className="ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
//       {token && personalizedRecs.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between mb-8">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                   Recommended for You
//                 </h2>
//                 <p className="text-gray-600">
//                   Based on your preferences and travel history
//                 </p>
//               </div>
//               <Link
//                 to="/recommendations/personalized"
//                 className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
//               >
//                 View All <FaArrowRight className="ml-2" />
//               </Link>
//             </div>
            
//             <RecommendationSection
//               recommendations={personalizedRecs}
//               loading={loading}
//               showPersonalized={true}
//             />
//           </div>
//         </section>
//       )}

//       {/* Trending Recommendations */}
//       <section className={`py-16 ${token && personalizedRecs.length > 0 ? 'bg-gray-50' : 'bg-white'}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                 Trending Destinations
//               </h2>
//               <p className="text-gray-600">
//                 Popular choices among travelers
//               </p>
//             </div>
//             <Link
//               to="/recommendations/trending"
//               className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
//             >
//               View All <FaArrowRight className="ml-2" />
//             </Link>
//           </div>
          
//           <RecommendationSection
//             recommendations={trendingRecs}
//             loading={loading}
//             showPersonalized={false}
//           />
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-gray-900 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">
//               Why Choose Our Platform?
//             </h2>
//             <p className="text-lg text-gray-300">
//               Experience seamless travel booking with our premium features
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FaStar className="text-2xl" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
//               <p className="text-gray-300">
//                 We compare prices across multiple providers to get you the best deals
//               </p>
//             </div>
            
//             <div className="text-center">
//               <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FaGift className="text-2xl" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
//               <p className="text-gray-300">
//                 Get personalized suggestions based on your preferences and history
//               </p>
//             </div>
            
//             <div className="text-center">
//               <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FaArrowRight className="text-2xl" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
//               <p className="text-gray-300">
//                 Simple, secure, and fast booking process for all your travel needs
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-gradient-to-r from-green-500 to-blue-600 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold mb-4">
//             Ready to Start Your Adventure?
//           </h2>
//           <p className="text-xl mb-8 text-green-100">
//             Join thousands of satisfied travelers who trust us with their journeys
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             {!token && (
//               <Link
//                 to="/register"
//                 className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition duration-300"
//               >
//                 Sign Up Today
//               </Link>
//             )}
//             <Link
//               to="/packages"
//               className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition duration-300"
//             >
//               Start Booking
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home; */}