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

    socket.on("room:join", ({ roomId }) => {
      socket.join(roomId);

      if (!activeRooms.has(roomId)) activeRooms.set(roomId, new Set());

      const users = activeRooms.get(roomId);
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

    socket.on("code:change", async ({ roomId, code, language }) => {
      socket.to(roomId).emit("code:update", { code, language, from: socket.userId });
      try {
        await updateRoomCode({ roomId, code, language });
      } catch (err) {
        socket.emit("error", { message: err.message });
      }
    });

    socket.on("cursor:move", ({ roomId, cursor }) => {
      socket.to(roomId).emit("cursor:update", {
        userId: socket.userId,
        name: socket.userName,
        cursor,
      });
    });

    socket.on("language:change", ({ roomId, language }) => {
      socket.to(roomId).emit("language:update", { language, from: socket.userName });
    });

    socket.on("chat:message", ({ roomId, message }) => {
      io.to(roomId).emit("chat:message", {
        userId: socket.userId,
        name: socket.userName,
        message,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on("room:leave", ({ roomId }) => {
      handleLeave(socket, io, roomId);
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      for (const roomId of socket.rooms) {
        handleLeave(socket, io, roomId);
      }
    });
  });
}

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
}import jwt from "jsonwebtoken";
import { env } from "../config/index.js";
import { updateRoomCode } from "../services/room.service.js";

// Map to track active users per room: roomId -> Set of { socketId, userId, name }
const activeRooms = new Map();

export function registerSocketHandlers(io) {
  // Authenticate socket connections with JWT
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

    // ─── Join a room ────────────────────────────────────────────────
    socket.on("room:join", ({ roomId }) => {
      socket.join(roomId);

      if (!activeRooms.has(roomId)) activeRooms.set(roomId, new Set());

      activeRooms.get(roomId).add({
        socketId: socket.id,
        userId: socket.userId,
        name: socket.userName,
      });

      // Tell everyone in the room who is online
      io.to(roomId).emit("room:users", getActiveUsers(roomId));

      // Notify others that someone joined
      socket.to(roomId).emit("room:user-joined", {
        userId: socket.userId,
        name: socket.userName,
      });

      console.log(`User ${socket.userName} joined room ${roomId}`);
    });

    // ─── Code change (real-time broadcast) ──────────────────────────
    socket.on("code:change", async ({ roomId, code, language }) => {
      // Broadcast the change to every OTHER user in the room instantly
      socket.to(roomId).emit("code:update", { code, language, from: socket.userId });

      // Persist the latest code to MongoDB (debounce handled on client side)
      try {
        await updateRoomCode({ roomId, code, language });
      } catch (err) {
        socket.emit("error", { message: err.message });
      }
    });

    // ─── Cursor position (for presence awareness) ───────────────────
    socket.on("cursor:move", ({ roomId, cursor }) => {
      socket.to(roomId).emit("cursor:update", {
        userId: socket.userId,
        name: socket.userName,
        cursor,
      });
    });

    // ─── Language change ─────────────────────────────────────────────
    socket.on("language:change", ({ roomId, language }) => {
      socket.to(roomId).emit("language:update", { language, from: socket.userName });
    });

    // ─── Chat message inside a room ──────────────────────────────────
    socket.on("chat:message", ({ roomId, message }) => {
      io.to(roomId).emit("chat:message", {
        userId: socket.userId,
        name: socket.userName,
        message,
        timestamp: new Date().toISOString(),
      });
    });

    // ─── Leave a room explicitly ─────────────────────────────────────
    socket.on("room:leave", ({ roomId }) => {
      handleLeave(socket, io, roomId);
    });

    // ─── On disconnect (tab closed / network drop) ───────────────────
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      for (const roomId of socket.rooms) {
        handleLeave(socket, io, roomId);
      }
    });
  });
}

// ─── Helpers ────────────────────────────────────────────────────────────────

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
