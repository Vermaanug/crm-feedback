import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { connectDB, getDBStatus } from "./src/config/db.js";
import feedbackRoutes from "./src/routes/feedback.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);
app.use(helmet());
app.use(express.json());

app.use("/api/feedback", feedbackRoutes);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] listening on port ${PORT} (${process.env.NODE_ENV || "development"})`);
  });
}

start();
