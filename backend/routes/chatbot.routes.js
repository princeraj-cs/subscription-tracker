import { Router } from "express";
import { chat } from "../controllers/chatbot.controller.js";

const chatbotRouter = Router();

chatbotRouter.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker Chatbot API");
});

chatbotRouter.post("/chat", chat);

export default chatbotRouter;