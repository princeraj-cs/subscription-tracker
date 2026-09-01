import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import chatbotRouter from "./routes/chatbot.routes.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chatbot", chatbotRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use(errorMiddleware); // Error handling middleware

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API");
});

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(
        `Subscription Tracker API is running on http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error(
      "Unable to start server because the database connection failed:",
      error.message || error,
    );
    console.warn(
      "If using MongoDB Atlas, verify DB_URI, database credentials, and Network Access allowlist settings.",
    );
    process.exit(1);
  }
};

startServer();

export default app;
