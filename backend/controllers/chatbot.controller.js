import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !String(message).trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful subscription tracker assistant. Help users manage subscriptions, cut waste, and answer questions about their recurring expenses.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const answer =
      completion?.choices?.[0]?.message?.content?.trim() ||
      "I couldn't generate a response right now. Please try again.";

    return res.status(200).json({
      success: true,
      data: {
        answer,
      },
    });
  } catch (error) {
    console.error("Error occurred while processing the chat request:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
