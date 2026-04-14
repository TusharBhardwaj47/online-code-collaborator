import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { env } from "./config/index.js";
import { connectDB } from "./config/db.js";
import { registerSocketHandlers } from "./socket/index.js";
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

async function bootstrap() {
  await connectDB();

  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: env.clientUrl,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  registerSocketHandlers(io);

  httpServer.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});
