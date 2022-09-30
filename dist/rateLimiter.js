import RateLimit from "express-rate-limit";
export const RateLimitTime = 0;
export const RateLimitRequests = 0;
export const rLimit = RateLimit({
    windowMs: RateLimitTime || 20 * 1000,
    max: RateLimitRequests || 4,
});
//# sourceMappingURL=rateLimiter.js.map