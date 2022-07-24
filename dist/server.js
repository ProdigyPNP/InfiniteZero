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
exports.StartServer = void 0;
const express_1 = __importDefault(require("express"));
const loadBalancer_1 = require("./loadBalancer/loadBalancer");
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const fs = __importStar(require("fs"));
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./constants");
const analytics_1 = require("./analytics");
async function StartServer() {
    const HTTPS_PORT = 443;
    const HTTP_PORT = 80;
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.get("/", (req, res) => {
        res.status(200).type("text/html").send(constants_1.INDEX_HTML);
    });
    app.get("/style.css", (req, res) => {
        res.status(200).type("text/css").send(constants_1.STYLE_CSS);
    });
    app.get("/favicon.png", (req, res) => {
        res.status(200).type("image/png").sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/favicon.png");
    });
    app.get("/favicon.ico", (req, res) => {
        res.status(200).type("image/png").sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/favicon.png");
    });
    app.get("/analytics.json", (req, res) => {
        res.status(200).type("text/json").sendFile(__dirname.substring(0, __dirname.length - 5) + "/analytics/all.json");
    });
    app.get("/uniques", (req, res) => {
        res.status(200).type("text/plain").send((0, analytics_1.CountUniqueIPs)().toString());
    });
    app.get("/eval/version", (req, res) => {
        res.status(200).type("text/plain").send(constants_1.VERSION);
    });
    app.get("/eval*", (req, res) => {
        (0, analytics_1.Analytics)(req);
        res.status(200).type("text/js").send(`
(async () => {
    eval(await (await fetch("${(0, loadBalancer_1.getURL)()}/game.min.js")).text());
})();
`.replace("\n", ""));
    });
    app.get("*", function (req, res) {
        res.status(200).type("text/plain").send((0, loadBalancer_1.getURL)());
    });
    var httpsServer;
    if (constants_1.HTTPS.valueOf()) {
        httpsServer = https_1.default.createServer({
            key: fs.readFileSync(constants_1.HTTPS_KEY_PATH),
            cert: fs.readFileSync(constants_1.HTTPS_CHAIN_PATH),
        }, app);
        httpsServer.listen(HTTPS_PORT, () => {
            console.log(`HTTPS Server running at: http://localhost:${HTTPS_PORT}/`);
        });
    }
    var httpServer = http_1.default.createServer(app);
    httpServer.listen(HTTP_PORT, () => {
        console.log(`HTTP Server running at: http://localhost:${HTTP_PORT}/`);
    });
}
exports.StartServer = StartServer;
//# sourceMappingURL=server.js.map