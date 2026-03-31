import { Router } from "express";
import {
  create,
  join,
  getRoom,
  myRooms,
  getHistory,
  saveSnapshot,
  close,
} from "../controllers/room.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

// All room routes require a logged-in user
router.use(authenticate);

router.post("/", create);
router.get("/my", myRooms);
router.get("/:roomId", getRoom);
router.post("/:roomId/join", join);
router.post("/:roomId/snapshot", saveSnapshot);
router.get("/:roomId/history", getHistory);
router.delete("/:roomId", close);

export default router;
