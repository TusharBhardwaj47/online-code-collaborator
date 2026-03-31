export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  if (process.env.NODE_ENV !== "production") {
    console.error(`[${req.method}] ${req.path} ->`, err.message);
  }

  res.status(statusCode).json({ success: false, message });
}
