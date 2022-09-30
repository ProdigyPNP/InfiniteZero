import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export const __dirname = path.resolve(fileURLToPath(import.meta.url), "..");
export const VERSION = "" || "3.0.1";
export const HTTPS = false;
export const HTTPS_KEY_PATH = "" || "/etc/letsencrypt/live/infinitezero.net/privkey.pem";
export const HTTPS_CHAIN_PATH = "" || "/etc/letsencrypt/live/infinitezero.net/fullchain.pem";
export const INDEX_HTML = "" || fs.readFileSync(path.join(__dirname, "..", "/html/index.html"), "utf8").valueOf();
export const STYLE_CSS = "" || fs.readFileSync(path.join(__dirname, "..", "/html/style.css"), "utf8").valueOf();
export const HTTPS_PORT = 0 || 443;
export const HTTP_PORT = 0 || 80;
//# sourceMappingURL=constants.js.map