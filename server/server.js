import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { connectDB, getDBStatus } from "./src/config/db.js";
import feedbackRoutes from "./src/routes/feedback.routes.js";
import { errorHandler, notFound } from "./src/middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "*",
  withCredentials: true,
};
// Middleware
app.use(
  cors(corsOptions)
);
app.use(helmet());
app.use(express.json());

app.use("/api/feedback", feedbackRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] listening on port ${PORT} (${process.env.NODE_ENV || "development"})`);
  });
}

start();
