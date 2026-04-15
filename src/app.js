import express from "express";
import cors from "cors";
import { env } from "./config/index.js";
import authRoutes from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";

const app = express();

// ✅ CORS


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://online-code-collaborator-3.onrender.com"
  ],
  credentials: true,
}));

// ✅ Body parser
app.use(express.json());

// ✅ Health check (optional but useful)
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);

// ✅ ROOT ROUTE (IMPORTANT FIX)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ❌ 404 handler (always after all routes)
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ❌ Global error handler (LAST)
app.use(errorHandler);

export default app;