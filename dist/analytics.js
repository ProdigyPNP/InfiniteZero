"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountUniqueIPs = exports.Analytics = exports.UniqueIPs = void 0;
const fs = __importStar(require("fs"));
function Analytics(req) {
    console.log("Req [");
    console.log("IP: {" + req.ip.toString() + "}. Unique: {" + AddUniqueIP(req) + "}");
    console.log("REQUEST: " + request(req));
    console.log("] Req");
}
exports.Analytics = Analytics;
function CountUniqueIPs() {
    const AllIPs = fs.readFileSync("./analytics/UniqueIPs.txt", "utf8").split("\n");
    const out = AllIPs.length;
    exports.UniqueIPs = out;
    return out;
}
exports.CountUniqueIPs = CountUniqueIPs;
function request(req) {
    const IP = req.ip.toString();
    const UserAgent = new String(req.headers["user-agent"]).valueOf();
    const DateTime = new Date(Date.now()).toString();
    const Path = req.path.toString();
    const out = JSON.stringify({ IP, UserAgent, DateTime, Path });
    fs.appendFileSync("./analytics/all.json", IP + "\n");
    return out;
}
function AddUniqueIP(req) {
    const IP = req.ip.toString();
    const AllIPs = fs.readFileSync("./analytics/UniqueIPs.txt", "utf8").split("\n");
    if (AllIPs.includes(IP)) {
        return false;
    }
    else {
        fs.appendFileSync("./analytics/UniqueIPs.txt", IP + "\n");
        return true;
    }
}
//# sourceMappingURL=analytics.js.map