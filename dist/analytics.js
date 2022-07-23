"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analytics = void 0;
function Analytics(req) {
    const IP = req.ip.toString();
    const UserAgent = new String(req.headers["user-agent"]).valueOf();
    const DateTime = new Date(Date.now()).toString();
    const Path = req.path.toString();
    console.log(JSON.stringify({ IP, UserAgent, DateTime, Path }));
}
exports.Analytics = Analytics;
//# sourceMappingURL=analytics.js.map