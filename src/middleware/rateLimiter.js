const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiterOptions = {
  keyPrefix: "middleware",
  points: 4, // 4 requests
  duration: 1, // per 1 second by IP
};

const rateLimiter = new RateLimiterMemory(rateLimiterOptions);

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    const result = await rateLimiter.consume(req.ip);

    res.set({
      "Retry-After": result.msBeforeNext / 1000,
      "X-RateLimit-Limit": rateLimiterOptions.points,
      "X-RateLimit-Remaining": res.remainingPoints,
      "X-RateLimit-Reset": new Date(Date.now() + res.msBeforeNext)
    });

    next();
  } catch (e) {
    res.status(429).send("Too Many Requests");
  }
};

module.exports = rateLimiterMiddleware;
