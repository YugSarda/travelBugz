import axios from "axios";

const API_URL = "http://localhost:5001/api/chat"; // Adjust if using a proxy or deployed

export const fetchChatResponse = async (message) => {
  const response = await axios.post(API_URL, { message });
  return response.data.reply;
};
