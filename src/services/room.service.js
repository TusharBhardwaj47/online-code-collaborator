import { nanoid } from "nanoid";
import { Room } from "../models/Room.js";
import { CodeHistory } from "../models/CodeHistory.js";

export async function createRoom({ name, language, userId }) {
  const roomId = nanoid(10);

  const room = await Room.create({
    roomId,
    name,
    language: language || "javascript",
    createdBy: userId,
    participants: [userId],
  });

  return toPublicRoom(room);
}

export async function joinRoom({ roomId, userId }) {
  const room = await Room.findOne({ roomId, isActive: true });
  if (!room) {
    const err = new Error("Room not found or no longer active");
    err.statusCode = 404;
    throw err;
  }

  const alreadyIn = room.participants.some((p) => p.toString() === userId);
  if (!alreadyIn) {
    room.participants.push(userId);
    await room.save();
  }

  return toPublicRoom(room);
}

export async function getRoomByRoomId(roomId) {
  const room = await Room.findOne({ roomId, isActive: true }).populate(
    "createdBy",
    "name email"
  );
  if (!room) {
    const err = new Error("Room not found");
    err.statusCode = 404;
    throw err;
  }
  return toPublicRoom(room);
}

export async function getUserRooms(userId) {
  const rooms = await Room.find({
    participants: userId,
    isActive: true,
  }).sort({ updatedAt: -1 });

  return rooms.map(toPublicRoom);
}

export async function updateRoomCode({ roomId, code, language }) {
  const room = await Room.findOneAndUpdate(
    { roomId },
    { code, ...(language && { language }) },
    { new: true }
  );
  if (!room) {
    const err = new Error("Room not found");
    err.statusCode = 404;
    throw err;
  }
  return toPublicRoom(room);
}

export async function saveCodeSnapshot({ roomId, code, language, userId }) {
  const snapshot = await CodeHistory.create({
    roomId,
    code,
    language,
    savedBy: userId,
  });
  return snapshot;
}

export async function getRoomHistory(roomId) {
  const history = await CodeHistory.find({ roomId })
    .populate("savedBy", "name email")
    .sort({ createdAt: -1 })
    .limit(20);

  return history;
}

export async function closeRoom({ roomId, userId }) {
  const room = await Room.findOne({ roomId });
  if (!room) {
    const err = new Error("Room not found");
    err.statusCode = 404;
    throw err;
  }

  if (room.createdBy.toString() !== userId) {
    const err = new Error("Only the room creator can close it");
    err.statusCode = 403;
    throw err;
  }

  room.isActive = false;
  await room.save();
  return { message: "Room closed successfully" };
}

function toPublicRoom(room) {
  return {
    id: room._id.toString(),
    roomId: room.roomId,
    name: room.name,
    language: room.language,
    code: room.code,
    createdBy: room.createdBy,
    participantCount: room.participants?.length ?? 0,
    isActive: room.isActive,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
  };
}
