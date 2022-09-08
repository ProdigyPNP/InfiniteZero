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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartServer = exports.log = void 0;
const fs = __importStar(require("fs"));
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const loadBalancer_1 = require("./loadBalancer/loadBalancer");
const analytics_1 = require("./analytics");
const constants_1 = require("./constants");
const rateLimiter_1 = require("./rateLimiter");
function log(content) {
    try {
        console.log("[無限零服器] " + content);
    }
    catch (error) {
        console.error(error);
        return false;
    }
    return true;
}
exports.log = log;
function StartServer() {
    log("ВКЛЮЧАЕМ СЕРВЕР Infinite Zero...");
    const app = (0, express_1.default)();
    log("ИСПОЛЬЗУЕМ CORS");
    app.use((0, cors_1.default)());
    log("ИСПОЛЬЗУЕМ RATE LIMITER");
    app.use(rateLimiter_1.rLimit);
    log("ДОБАВЛЯЕМ СТРАНИЦУ /index.html...");
    app.get("/", (req, res) => {
        res.status(200).type("text/html").send(constants_1.INDEX_HTML);
    });
    log("ДОБАВИЛИ СТРАНИЦУ /index.html.");
    log("ДОБАВЛЯЕМ СТРАНИЦУ /style.css...");
    app.get("/style.css", (req, res) => {
        res.status(200).type("text/css").send(constants_1.STYLE_CSS);
    });
    log("ДОБАВИЛИ СТРАНИЦУ /style.css.");
    log("ДОБАВЛЯЕМ ФАЙЛ /analytics.json...");
    app.get("/analytics.json", (req, res) => {
        res.status(200).type("text/json").sendFile(path_1.default.join(__dirname, "..", "/analytics/all.json"));
    });
    log("ДОБАВИЛИ ФАЙЛ /analytics.json.");
    log("ДОБАВЛЯЕМ ФАЙЛ /uniques...");
    app.get("/uniques", (_req, res) => {
        res.status(200).type("text/plain").send((0, analytics_1.CountUniqueIPs)().toString());
    });
    log("ДОБАВИЛИ ФАЙЛ /uniques.");
    log("ДОБАВЛЯЕМ ФАЙЛ /version...");
    app.get("/version", (req, res) => {
        res.status(200).type("text/plain").send(constants_1.VERSION);
    });
    log("ДОБАВИЛИ ФАЙЛ /version.");
    log("ДОБАВЛЯЕМ ФАЙЛ /eval/version...");
    app.get("/eval/version", (req, res) => {
        res.status(200).type("text/plain").send(constants_1.VERSION);
    });
    log("ДОБАВИЛИ ФАЙЛ /eval/version.");
    log("ДОБАВЛЯЕМ КОД /eval*...");
    app.get("/eval*", (req, res) => {
        (0, analytics_1.Analytics)(req);
        if (typeof req.query["force"] === "string") {
            res.status(200).type("text/js").send(`
(async () => {
    eval(await (await fetch("${req.query["force"]}/game.min.js")).text());
})();
            `);
        }
        else {
            res.status(200).type("text/js").send(`
(async () => {
    eval(await (await fetch("${(0, loadBalancer_1.getURL)()}/game.min.js")).text());
})();
            `);
        }
    });
    log("ДОБАВИЛИ КОД /eval*.");
    log("ДОБАВЛЯЕМ ДОМЕН /*...");
    app.get("*", (req, res) => {
        (0, analytics_1.Analytics)(req);
        if (typeof req.query["force"] === "string") {
            res.status(200).type("text/plain").send(req.query["force"].valueOf());
        }
        else {
            res.status(200).type("text/plain").send((0, loadBalancer_1.getURL)());
        }
    });
    log("ДОБАВИЛИ ДОМЕН /*.");
    var httpsServer;
    if (constants_1.HTTPS) {
        log("ИСПОЛЬЗУЕМ HTTPS.");
        httpsServer = https_1.default.createServer({
            key: fs.readFileSync(constants_1.HTTPS_KEY_PATH),
            cert: fs.readFileSync(constants_1.HTTPS_CHAIN_PATH),
        }, app);
        httpsServer.listen(constants_1.HTTPS_PORT, () => {
            log(`СЕРВЕР HTTPS ВКЛЮЧЕН НА: http://localhost:${constants_1.HTTPS_PORT}/`);
        });
    }
    else {
        log("НЕ ИСПОЛЬЗУЕМ HTTPS.");
    }
    const httpServer = http_1.default.createServer(app);
    httpServer.listen(constants_1.HTTP_PORT, () => {
        log(`СЕРВЕР HTTP ВКЛЮЧЕН НА: http://localhost:${constants_1.HTTP_PORT}/`);
    });
}
exports.StartServer = StartServer;
//# sourceMappingURL=server.js.map