import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { connectDB, getDBStatus } from "./src/config/db.js";

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



async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] listening on port ${PORT} (${process.env.NODE_ENV || "development"})`);
  });
}

start();
