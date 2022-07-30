import * as fs from "fs";

/** PHEx Version */
export const VERSION : string = "2.2.1";

/** Run HTTPS Server */
export const HTTPS : boolean = true;
/** Path to HTTPS Private Key */
export const HTTPS_KEY_PATH : string = "/etc/letsencrypt/live/infinitezero.net/privkey.pem";
/** Path to HTTPS Full Chain */
export const HTTPS_CHAIN_PATH : string = "/etc/letsencrypt/live/infinitezero.net/fullchain.pem";

/** FilePath to index.html */
export const INDEX_HTML : string = fs.readFileSync(__dirname.substring(0, __dirname.length - 5) + "/html/index.html", "utf8").valueOf();
/** FilePath to style.css */
export const STYLE_CSS : string = fs.readFileSync(__dirname.substring(0, __dirname.length - 5) + "/html/style.css", "utf8").valueOf();

/** Port for HTTPS server */
export const HTTPS_PORT : number = 443;
/** Port for HTTP server */
export const HTTP_PORT : number = 80;
