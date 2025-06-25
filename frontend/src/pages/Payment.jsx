// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaCreditCard, FaCheckCircle } from "react-icons/fa";
// import { createBooking } from "../api/bookingService";
// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const amount = location.state?.amount || 0;

//   const [paymentCompleted, setPaymentCompleted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handlePayment = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setPaymentCompleted(true);
//       setLoading(false);
//     }, 2000); // Simulate processing time
//   };
//   useEffect(() => {
//     const storeBooking = async () => {
//       try {
//         const username = localStorage.getItem("username");
//         const email = localStorage.getItem("email");
//         const { amount, id, type } = location.state;
  
//         // Call the API with booking data
//         await createBooking({
//           username,
//           email,
//           price: amount,
//           type,
//           foreignKey: id,
//         });
  
//         // Redirect after booking
//         setTimeout(() => {
//           navigate("/");
//         }, 1500);
//       } catch (error) {
//         console.error("Failed to store booking:", error);
//         alert(
//           "✅ Payment succeeded but booking couldn't be saved. Please contact support."
//         );
//       }
//     };
  
//     if (paymentCompleted) {
//       storeBooking();
//     }
//   }, [paymentCompleted, location.state, navigate]);
  
  

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-[#002b6b]">
//       <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition duration-300 hover:scale-105 animate-fadeIn">
//         {/* ✅ Payment Title */}
//         <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-4">
//           💳 Secure Payment
//         </h2>

//         {/* ✅ Payment Form */}
//         {!paymentCompleted ? (
//           <>
//             <p className="text-gray-600 text-center mb-6">
//               Please enter your card details to complete the booking.
//             </p>

//             {/* ✅ Card Input */}
//             <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
//               <label className="block text-gray-700 font-semibold">Card Number</label>
//               <input
//                 type="text"
//                 placeholder="**** **** **** 1234"
//                 className="border p-3 w-full rounded-lg focus:ring focus:ring-blue-300"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
//                 <label className="block text-gray-700 font-semibold">Expiry Date</label>
//                 <input
//                   type="text"
//                   placeholder="MM/YY"
//                   className="border p-3 w-full rounded-lg focus:ring focus:ring-blue-300"
//                 />
//               </div>
//               <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
//                 <label className="block text-gray-700 font-semibold">CVV</label>
//                 <input
//                   type="password"
//                   placeholder="•••"
//                   className="border p-3 w-full rounded-lg focus:ring focus:ring-blue-300"
//                 />
//               </div>
//             </div>

//             {/* ✅ Payment Summary */}
//             <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
//               <p className="text-lg font-semibold text-gray-700">
//                 Total Amount: <span className="text-blue-600 font-bold">₹{amount}</span>
//               </p>
//               <p className="text-sm text-gray-500">Includes all taxes & service charges</p>
//             </div>

//             {/* ✅ Payment Button */}
//             <button
//               onClick={handlePayment}
//               className={`mt-6 w-full ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               } text-white py-3 rounded-lg shadow-lg transition transform hover:scale-105`}
//               disabled={loading}
//             >
//               {loading ? "Processing..." : "Pay Now"}
//             </button>
//           </>
//         ) : (
//           // ✅ Success Message
//           <div className="text-center animate-fadeIn">
//             <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-gray-800">Payment Successful!</h3>
//             <p className="text-gray-500 mt-2">Your booking is confirmed.</p>
//             <p className="text-blue-600 font-semibold mt-2">Redirecting to home...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Payment;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { createBooking } from "../api/bookingService";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || 0;

  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("card");

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setPaymentCompleted(true);
      setLoading(false);
    }, 2000);
  };
 


  useEffect(() => {
    const storeBooking = async () => {
      try {
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        const { amount, id, type } = location.state;

        await createBooking({
          username,
          email,
          price: amount,
          type,
          foreignKey: id,
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        console.error("Failed to store booking:", error);
        alert(
          "✅ Payment succeeded but booking couldn't be saved. Please contact support."
        );
      }
    };

    if (paymentCompleted) {
      storeBooking();
    }
  }, [paymentCompleted, location.state, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#002b6b]">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          💳 Complete Your Payment
        </h2>

        {!paymentCompleted ? (
          <>
            {/* Tab Headers */}
            <div className="flex justify-between mb-6">
              {["card", "upi", "netbanking"].map((tab) => (
                <button
                  key={tab}
                  className={`w-full py-2 px-4 rounded-t-lg font-semibold transition-all ${
                    method === tab
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 text-blue-700"
                  }`}
                  onClick={() => setMethod(tab)}
                >
                  {tab === "card" && "Card"}
                  {tab === "upi" && "UPI"}
                  {tab === "netbanking" && "Net Banking"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-gray-100 p-6 rounded-b-xl">
              {method === "card" && (
                <>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="**** **** **** 1234"
                    className="w-full p-3 rounded-md border mb-4"
                  />
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-3 rounded-md border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        className="w-full p-3 rounded-md border"
                      />
                    </div>
                  </div>
                </>
              )}

              {method === "upi" && (
                <>
                  <label className="block text-sm font-medium mb-1">UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    className="w-full p-3 rounded-md border mb-4"
                  />
                  <p className="text-sm text-gray-600 mb-2">
                    You’ll receive a request on your UPI app.
                  </p>
                </>
              )}

              {method === "netbanking" && (
                <>
                  <label className="block text-sm font-medium mb-1">Choose Bank</label>
                  <select className="w-full p-3 rounded-md border mb-4">
                    <option value="">Select your bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Yes Bank</option>
                  </select>
                  <p className="text-sm text-gray-600 mb-2">
                    You’ll be redirected to your bank’s net banking page.
                  </p>
                </>
              )}

              {/* Payment Summary */}
              <div className="bg-white p-4 rounded-lg border mt-4">
                <p className="text-lg font-bold text-gray-800">
                  Total: ₹{amount}
                </p>
                <p className="text-sm text-gray-500">Includes all taxes and charges</p>
              </div>

              {/* Action Button */}
              <button
                onClick={ handlePayment}
                disabled={loading}
                className={`mt-6 w-full py-3 rounded-lg text-white font-semibold transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </>
        ) : (
          // Payment Success Message
          <div className="text-center animate-fadeIn">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">Payment Successful!</h3>
            <p className="text-gray-500 mt-2">Your booking is confirmed.</p>
            <p className="text-blue-600 font-semibold mt-2">Redirecting to home...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
