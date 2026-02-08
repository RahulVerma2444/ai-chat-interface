import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.post("/api/ai", async (req, res) => {  
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Message array required" });
    }


    // Correct OpenAI API endpoint
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Updated model name
        messages: messages,
        max_tokens: 500
      })
    });


    const data = await response.json();


    if (!response.ok) {
      console.error("OpenAI error:", data);
      return res.status(500).json({
        error: data.error?.message || "OpenAI API error"
      });
    }


    // Extract the response text
    const reply = data.choices?.[0]?.message?.content || "No response generated";
   
    res.json({
      reply: reply,
      fullResponse: data // Optional: for debugging
    });


  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "AI request failed: " + err.message });
  }
});


app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});


app.listen(3001, () => {
  console.log("AI server running on http://localhost:3001");
});


console.log("Using key:", process.env.OPENAI_API_KEY?.slice(0, 8));



