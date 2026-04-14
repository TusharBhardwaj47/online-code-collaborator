import {
  createRoom,
  joinRoom,
  getRoomByRoomId,
  getUserRooms,
  getRoomHistory,
  closeRoom,
  saveCodeSnapshot,
} from "../services/room.service.js";

export async function create(req, res, next) {
  try {
    const { name, language } = req.body;
    const room = await createRoom({ name, language, userId: req.userId });
    res.status(201).json({ success: true, data: { room } });
  } catch (err) {
    next(err);
  }
}

export async function join(req, res, next) {
  try {
    const { roomId } = req.params;
    const room = await joinRoom({ roomId, userId: req.userId });
    res.status(200).json({ success: true, data: { room } });
  } catch (err) {
    next(err);
  }
}

export async function getRoom(req, res, next) {
  try {
    const { roomId } = req.params;
    const room = await getRoomByRoomId(roomId);
    res.status(200).json({ success: true, data: { room } });
  } catch (err) {
    next(err);
  }
}

export async function myRooms(req, res, next) {
  try {
    const rooms = await getUserRooms(req.userId);
    res.status(200).json({ success: true, data: { rooms } });
  } catch (err) {
    next(err);
  }
}

export async function getHistory(req, res, next) {
  try {
    const { roomId } = req.params;
    const history = await getRoomHistory(roomId);
    res.status(200).json({ success: true, data: { history } });
  } catch (err) {
    next(err);
  }
}

export async function saveSnapshot(req, res, next) {
  try {
    const { roomId } = req.params;
    const { code, language } = req.body;
    const snapshot = await saveCodeSnapshot({
      roomId,
      code,
      language,
      userId: req.userId,
    });
    res.status(201).json({ success: true, data: { snapshot } });
  } catch (err) {
    next(err);
  }
}

export async function close(req, res, next) {
  try {
    const { roomId } = req.params;
    const result = await closeRoom({ roomId, userId: req.userId });
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
