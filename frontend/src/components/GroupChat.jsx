import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5001");

const GroupChat = ({ groupId, userId }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinGroup", groupId);

    axios.get(`http://localhost:5001/api/messages/${groupId}`).then((res) => {
      setMessages(res.data);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [groupId]);

  const sendMessage = () => {
    socket.emit("sendMessage", { groupId, userId, text });
    setText("");
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Group Chat</h2>
      <div className="h-64 overflow-y-scroll bg-white p-2 border rounded mb-2">
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.sender?.name || "User"}:</b> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="border p-2 flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={sendMessage} className="bg-green-600 text-white px-4 py-1 ml-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
