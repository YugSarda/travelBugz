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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 py-10 px-6 md:px-12">
      <Chatbot />
    </div>
  );
};

export default ChatPage;
