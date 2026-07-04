// Catches anything passed to next(err) from controllers, plus thrown errors
// in async routes (via the asyncHandler wrapper we'll add alongside controllers).
// Centralizing this means controllers never format error JSON themselves —
// one place to change the response shape later.
export function errorHandler(err, req, res, next) {
  console.error(`[error] ${req.method} ${req.originalUrl} -`, err.message);

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production" && statusCode === 500
      ? "Something went wrong on our end."
      : err.message;

  res.status(statusCode).json({
    success: false,
    message,
  });
}

// 404 handler for routes that don't match anything defined
export function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}
