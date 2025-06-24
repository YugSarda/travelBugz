// // src/pages/ChatbotPage.jsx
// import React from "react";
// import Chatbot from "../components/Chatbot";

// const ChatbotPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Chatbot />
//     </div>
//   );
// };

// export default ChatbotPage;
import React from 'react';
import Chatbot from '../components/Chatbot';

const ChatPage = () => {
  return (
    <div className="min-h-screen p-6 bg-[#002b6b] flex items-center justify-center">
      <Chatbot />
    </div>
  );
};

export default ChatPage;
