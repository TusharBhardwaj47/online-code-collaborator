import { registerUser, loginUser, getUserById } from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const result = await registerUser({ name, email, password });
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = await getUserById(req.userId);
    res.status(200).json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
}
