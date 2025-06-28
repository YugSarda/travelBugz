
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
    <div className="bg-white w-full max-w-3xl h-[90vh] rounded-2xl shadow-lg p-6 flex flex-col">
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
