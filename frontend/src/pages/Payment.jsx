import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCreditCard, FaCheckCircle } from "react-icons/fa";
import { createBooking } from "../api/bookingService";
const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || 0;

  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setPaymentCompleted(true);
      setLoading(false);
    }, 2000); // Simulate processing time
  };
  useEffect(() => {
    const storeBooking = async () => {
      try {
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        const { amount, id, type } = location.state;
  
        // Call the API with booking data
        await createBooking({
          username,
          email,
          price: amount,
          type,
          foreignKey: id,
        });
  
        // Redirect after booking
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-[#002b6b]">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition duration-300 hover:scale-105 animate-fadeIn">
        {/* ✅ Payment Title */}
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-4">
          💳 Secure Payment
        </h2>

        {/* ✅ Payment Form */}
        {!paymentCompleted ? (
          <>
            <p className="text-gray-600 text-center mb-6">
              Please enter your card details to complete the booking.
            </p>

            {/* ✅ Card Input */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <label className="block text-gray-700 font-semibold">Card Number</label>
              <input
                type="text"
                placeholder="**** **** **** 1234"
                className="border p-3 w-full rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                <label className="block text-gray-700 font-semibold">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="border p-3 w-full rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                <label className="block text-gray-700 font-semibold">CVV</label>
                <input
                  type="password"
                  placeholder="•••"
                  className="border p-3 w-full rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            {/* ✅ Payment Summary */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-700">
                Total Amount: <span className="text-blue-600 font-bold">₹{amount}</span>
              </p>
              <p className="text-sm text-gray-500">Includes all taxes & service charges</p>
            </div>

            {/* ✅ Payment Button */}
            <button
              onClick={handlePayment}
              className={`mt-6 w-full ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white py-3 rounded-lg shadow-lg transition transform hover:scale-105`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </>
        ) : (
          // ✅ Success Message
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
