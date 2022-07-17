"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer_http = void 0;
const express_1 = __importDefault(require("express"));
const loadBalancer_1 = require("./loadBalancer/loadBalancer");
async function startServer_http() {
    const app = (0, express_1.default)();
    const PORT = 80;
    app.get("/", (req, res) => {
        res.status(200).sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/index.html");
    });
    app.get("/style.css", (req, res) => {
        res.status(200).sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/style.css");
    });
    app.get("/favicon.png", (req, res) => {
        res.status(200).sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/favicon.png");
    });
    app.get("/eval*", (req, res) => {
        res.status(200).type("text/js").send(`
(async () => {
    eval(await (await fetch("${(0, loadBalancer_1.getURL)()}")).text());
})();
`.replace("\n", ""));
    });
    app.get("*", function (req, res) {
        res.status(200).type("text/plain").send((0, loadBalancer_1.getURL)());
    });
    app.listen(PORT, () => {
        console.log(`HTTP Server running at: http://localhost:${PORT}/`);
    });
}
exports.startServer_http = startServer_http;
//# sourceMappingURL=httpserver.js.map