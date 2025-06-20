// // src/components/Chatbot.jsx
// import React, { useState, useRef, useEffect } from "react";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { text: "Hi! How can I help you today?", sender: "bot" },
//   ]);
//   const [input, setInput] = useState("");
//   const chatRef = useRef(null);

//   const handleUserMessage = () => {
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: "user" };
//     const newMessages = [...messages, userMessage];
//     const response = getBotResponse(input.toLowerCase());

//     setMessages([...newMessages, response]);
//     setInput("");
//   };

// const getBotResponse = (msg) => {
//   msg = msg.toLowerCase();

//   if (msg.includes("book")) {
//     return { text: "You can book destinations from the Explore page.", sender: "bot" };
//   } else if (msg.includes("weather")) {
//     return { text: "Weather-based suggestions are in the Weather tab.", sender: "bot" };
//   } else if (msg.includes("currency")) {
//     return { text: "Currency converter is available in the top Navbar.", sender: "bot" };
//   } else if (msg.includes("hello") || msg.includes("hi")) {
//     return { text: "Hello! 😊 How can I assist you?", sender: "bot" };
//   } else if (msg.includes("cancel")) {
//     return { text: "To cancel a booking, please visit the My Bookings section.", sender: "bot" };
//   } else if (msg.includes("refund")) {
//     return { text: "Refunds are processed within 5–7 business days post cancellation.", sender: "bot" };
//   } else if (msg.includes("support") || msg.includes("help")) {
//     return { text: "You can contact our 24/7 support from the Help section in the footer.", sender: "bot" };
//   } else if (msg.includes("explore")) {
//     return { text: "You can browse destinations in the Explore section.", sender: "bot" };
//   } else if (msg.includes("login") || msg.includes("signup") || msg.includes("register")) {
//     return { text: "You can log in or register using the top-right corner buttons.", sender: "bot" };
//   } else if (msg.includes("budget")) {
//     return { text: "Budget filters are available in the Explore tab for each destination.", sender: "bot" };
//   } else if (msg.includes("payment")) {
//     return { text: "We accept cards, UPI, net banking, and wallets.", sender: "bot" };
//   } else if (msg.includes("discount") || msg.includes("offer")) {
//     return { text: "Check our Offers section for current discounts and promo codes!", sender: "bot" };
//   } else if (msg.includes("language")) {
//     return { text: "Our website supports multiple languages. You can change it from the footer.", sender: "bot" };
//   } else if (msg.includes("visa")) {
//     return { text: "We provide visa assistance after booking confirmation.", sender: "bot" };
//   } else if (msg.includes("itinerary")) {
//     return { text: "Itineraries are shown on the destination details page.", sender: "bot" };
//   } else if (msg.includes("hotel")) {
//     return { text: "Hotel info is available under each destination listing.", sender: "bot" };
//   } else if (msg.includes("flight")) {
//     return { text: "Flight booking options are included in the destination packages.", sender: "bot" };
//   } else if (msg.includes("group")) {
//     return { text: "Yes! Group bookings can be made via the Group Travel section.", sender: "bot" };
//   } else if (msg.includes("family")) {
//     return { text: "We offer family-friendly travel packages with kids’ activities.", sender: "bot" };
//   } else if (msg.includes("honeymoon")) {
//     return { text: "Honeymoon packages are available under 'Romantic Getaways' in Explore.", sender: "bot" };
//   } else if (msg.includes("travel insurance")) {
//     return { text: "We provide travel insurance options during checkout.", sender: "bot" };
//   } else if (msg.includes("feedback") || msg.includes("review")) {
//     return { text: "You can leave a review after your trip in the My Trips section.", sender: "bot" };
//   } else if (msg.includes("popular") || msg.includes("top destinations")) {
//     return { text: "Our top-rated destinations are featured on the homepage and Explore section.", sender: "bot" };
//   } else if (msg.includes("timezone") || msg.includes("time")) {
//     return { text: "Time zones for destinations are listed in the itinerary.", sender: "bot" };
//   } else if (msg.includes("safety")) {
//     return { text: "We ensure safety with verified accommodations and 24x7 helpline.", sender: "bot" };
//   }

//   // Extra 20 from previous response
//   else if (msg.includes("documents")) {
//     return { text: "Passport, visa, and ID proof are usually required. Check your destination requirements.", sender: "bot" };
//   } else if (msg.includes("reschedule")) {
//     return { text: "Yes, you can reschedule via the My Bookings page if allowed by the provider.", sender: "bot" };
//   } else if (msg.includes("student discount")) {
//     return { text: "We offer student discounts on select packages. Check the Offers page.", sender: "bot" };
//   } else if (msg.includes("meal")) {
//     return { text: "Some packages include meals. Please check the details of each plan.", sender: "bot" };
//   } else if (msg.includes("book for someone")) {
//     return { text: "Yes! You can book for a friend or family member using their details.", sender: "bot" };
//   } else if (msg.includes("age limit")) {
//     return { text: "Solo travelers must be 18+. For children, a guardian is required.", sender: "bot" };
//   } else if (msg.includes("invoice") || msg.includes("receipt")) {
//     return { text: "Invoices and receipts are downloadable from the My Bookings page.", sender: "bot" };
//   } else if (msg.includes("wifi")) {
//     return { text: "Wi-Fi availability depends on the hotel. Most premium stays offer free Wi-Fi.", sender: "bot" };
//   } else if (msg.includes("pickup") || msg.includes("drop")) {
//     return { text: "Airport pickup/drop can be added while booking or requested separately.", sender: "bot" };
//   } else if (msg.includes("check-in") || msg.includes("check out")) {
//     return { text: "Check-in is usually at 2 PM and check-out at 11 AM. It varies by property.", sender: "bot" };
//   } else if (msg.includes("luggage")) {
//     return { text: "Extra luggage can be added during flight booking for an additional fee.", sender: "bot" };
//   } else if (msg.includes("flight delay")) {
//     return { text: "In case of flight delays, contact airline support or check status in My Trips.", sender: "bot" };
//   } else if (msg.includes("part payment")) {
//     return { text: "We support part payments for select packages. You'll see the option at checkout.", sender: "bot" };
//   } else if (msg.includes("covid") || msg.includes("vaccination")) {
//     return { text: "Check destination guidelines. Most international travel requires full vaccination or testing.", sender: "bot" };
//   } else if (msg.includes("guide")) {
//     return { text: "Yes! You can request a local guide during the booking process.", sender: "bot" };
//   } else if (msg.includes("share")) {
//     return { text: "Use the share button on the destination or itinerary page to send to friends!", sender: "bot" };
//   } else if (msg.includes("app")) {
//     return { text: "Our mobile app is launching soon! Stay tuned in the Updates section.", sender: "bot" };
//   } else if (msg.includes("miss tour")) {
//     return { text: "If you miss your tour, contact support immediately to reschedule or get partial refund.", sender: "bot" };
//   } else if (msg.includes("change hotel") || msg.includes("change accommodation")) {
//     return { text: "Hotel changes are allowed 48 hours before the check-in date.", sender: "bot" };
//   } else if (msg.includes("wheelchair") || msg.includes("special need")) {
//     return { text: "We support accessible travel. Mention your need while booking or call support.", sender: "bot" };
//   }

//   // Default
//   else {
//     return { text: "Sorry, I didn't get that. Try asking about bookings, refunds, hotels, or support.", sender: "bot" };
//   }
// };



//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleUserMessage();
//   };

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-lg p-6 border">
//       <h2 className="text-2xl font-bold mb-4 text-center">Travel Assistant Chatbot 🤖</h2>
//       <div ref={chatRef} className="h-96 overflow-y-auto space-y-2 border p-3 rounded bg-gray-50">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-2 rounded-md max-w-[75%] ${
//               msg.sender === "bot"
//                 ? "bg-gray-200 text-left"
//                 : "bg-blue-600 text-white ml-auto text-right"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="mt-4 flex">
//         <input
//           type="text"
//           className="flex-1 border rounded-md px-3 py-2"
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//         <button
//           className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md"
//           onClick={handleUserMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
import React, { useState } from 'react';
import { fetchChatResponse } from '../api/chatbotService';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await fetchChatResponse(input);
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: "Sorry, I couldn't respond." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">AI Travel Assistant</h2>
      <div className="h-96 overflow-y-auto p-3 border border-gray-200 rounded mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded ${
              msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <p className="italic text-gray-500">AI is typing...</p>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border border-gray-300 p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask me anything about your trip..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
