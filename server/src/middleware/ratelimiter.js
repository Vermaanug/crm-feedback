// Minimal in-memory rate limiter — no Redis/external dependency needed
// for this scope. Limits each IP to N submissions per time window.
// NOTE: resets on server restart and won't work correctly across multiple
// instances (a real multi-instance deployment needs Redis-backed limiting) —
// that trade-off is documented in DECISIONS.md.
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

const hits = new Map(); // ip -> [timestamps]

export function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const timestamps = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again in a minute.",
    });
  }

  timestamps.push(now);
  hits.set(ip, timestamps);
  next();
}
