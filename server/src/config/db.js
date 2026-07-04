import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  try {
    if (!uri) {
      throw new Error("MONGO_URI is not set in environment variables");
    }
    await mongoose.connect(uri);
    isConnected = true;
    console.log("[db] MongoDB connected");
  } catch (err) {
    isConnected = false;
    console.error("[db] MongoDB connection failed:", err.message);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    isConnected = false;
    console.warn("[db] MongoDB disconnected");
  });
}

export function getDBStatus() {
  return isConnected ? "connected" : "disconnected";
}