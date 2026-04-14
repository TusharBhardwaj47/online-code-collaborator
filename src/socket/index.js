import jwt from "jsonwebtoken";
import { env } from "../config/index.js";
import { updateRoomCode } from "../services/room.service.js";

const activeRooms = new Map();

export function registerSocketHandlers(io) {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication required"));

    try {
      const payload = jwt.verify(token, env.jwtSecret);
      socket.userId = payload.sub;
      socket.userName = socket.handshake.auth?.name ?? "Anonymous";
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id} (user: ${socket.userId})`);

    // Join room
    socket.on("room:join", ({ roomId }) => {
      socket.join(roomId);

      if (!activeRooms.has(roomId)) activeRooms.set(roomId, new Set());

      const users = activeRooms.get(roomId);

      // remove duplicate user
      users.forEach((u) => {
        if (u.userId === socket.userId) users.delete(u);
      });

      users.add({
        socketId: socket.id,
        userId: socket.userId,
        name: socket.userName,
      });

      io.to(roomId).emit("room:users", getActiveUsers(roomId));

      socket.to(roomId).emit("room:user-joined", {
        userId: socket.userId,
        name: socket.userName,
      });
    });

    // Code change
    socket.on("code:change", async ({ roomId, code, language }) => {
   socket.to(roomId).emit("code:update", {
  code,
  language,
  userId: socket.id
});

      try {
        await updateRoomCode({ roomId, code, language });
      } catch (err) {
        socket.emit("error", { message: err.message });
      }
    });

    // Cursor move
    socket.on("cursor:move", ({ roomId, cursor }) => {
      socket.to(roomId).emit("cursor:update", {
        userId: socket.userId,
        name: socket.userName,
        cursor,
      });
    });

    // Language change
    socket.on("language:change", ({ roomId, language }) => {
      socket.to(roomId).emit("language:update", {
        language,
        from: socket.userName,
      });
    });

    // Chat
    socket.on("chat:message", ({ roomId, message }) => {
      io.to(roomId).emit("chat:message", {
        userId: socket.userId,
        name: socket.userName,
        message,
        timestamp: new Date().toISOString(),
      });
    });

    // Leave room
    socket.on("room:leave", ({ roomId }) => {
      handleLeave(socket, io, roomId);
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      for (const roomId of socket.rooms) {
        handleLeave(socket, io, roomId);
      }
    });
  });
}

// Helpers
function handleLeave(socket, io, roomId) {
  socket.leave(roomId);

  const users = activeRooms.get(roomId);
  if (users) {
    users.forEach((u) => {
      if (u.socketId === socket.id) users.delete(u);
    });
    if (users.size === 0) activeRooms.delete(roomId);
  }

  io.to(roomId).emit("room:users", getActiveUsers(roomId));

  socket.to(roomId).emit("room:user-left", {
    userId: socket.userId,
    name: socket.userName,
  });
}

function getActiveUsers(roomId) {
  const users = activeRooms.get(roomId);
  if (!users) return [];
  return [...users].map(({ userId, name }) => ({ userId, name }));
}