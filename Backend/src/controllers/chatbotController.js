import axios from "axios";

export const chatWithAI = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openai/gpt-3.5-turbo",
        max_tokens:300, // free & fast model
        messages: [
          { role: "system", content: "You are a helpful travel assistant chatbot." },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error in chatWithAI:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
};
