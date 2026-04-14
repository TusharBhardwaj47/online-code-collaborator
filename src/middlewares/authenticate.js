import jwt from "jsonwebtoken";
import { env } from "../config/index.js";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}
