"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rLimit = exports.RateLimitRequests = exports.RateLimitTime = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.RateLimitTime = 0;
exports.RateLimitRequests = 0;
exports.rLimit = (0, express_rate_limit_1.default)({
    windowMs: exports.RateLimitTime || 20 * 1000,
    max: exports.RateLimitRequests || 4,
});
//# sourceMappingURL=rateLimiter.js.map