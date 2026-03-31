import mongoose from "mongoose";
import { env } from "./index.js";

export async function connectDB() {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

  await mongoose.connect(env.mongoUri);
}
