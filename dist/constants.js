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
exports.HTTP_PORT = exports.HTTPS_PORT = exports.STYLE_CSS = exports.INDEX_HTML = exports.HTTPS_CHAIN_PATH = exports.HTTPS_KEY_PATH = exports.HTTPS = exports.VERSION = void 0;
const fs = __importStar(require("fs"));
exports.VERSION = "2.2.1";
exports.HTTPS = true;
exports.HTTPS_KEY_PATH = "/etc/letsencrypt/live/infinitezero.net/privkey.pem";
exports.HTTPS_CHAIN_PATH = "/etc/letsencrypt/live/infinitezero.net/fullchain.pem";
exports.INDEX_HTML = fs.readFileSync(__dirname.substring(0, __dirname.length - 5) + "/html/index.html", "utf8").valueOf();
exports.STYLE_CSS = fs.readFileSync(__dirname.substring(0, __dirname.length - 5) + "/html/style.css", "utf8").valueOf();
exports.HTTPS_PORT = 443;
exports.HTTP_PORT = 80;
//# sourceMappingURL=constants.js.map