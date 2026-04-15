import express from "express";
import cors from "cors";
import { env } from "./config/index.js";
import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// ✅ ALLOWED ORIGINS
const allowedOrigins = [
  "http://localhost:5173",
  "https://online-code-collaborator-3.onrender.com"
];

// ✅ CORS FIX (IMPORTANT)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ Health
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);

// ✅ Root
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ❌ 404
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ❌ Error
app.use(errorHandler);

export default app;