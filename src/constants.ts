import * as fs from "fs";

export const VERSION : string = "2.2.0";

export const HTTPS : boolean = true;
export const HTTPS_KEY_PATH : string = "/etc/letsencrypt/live/infinitezero.net/privkey.pem";
export const HTTPS_CHAIN_PATH : string = "/etc/letsencrypt/live/infinitezero.net/fullchain.pem";

export const INDEX_HTML : string = fs.readFileSync(__dirname.substring(0, __dirname.length - 5) + "/html/index.html", "utf8").valueOf();
export const STYLE_CSS : string = fs.readFileSync(__dirname.substring(0, __dirname.length - 5) + "/html/style.css", "utf8").valueOf();