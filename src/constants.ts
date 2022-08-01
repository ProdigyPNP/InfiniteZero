/** File System */
import * as fs from "fs";



/*-----------------------------------------------*
 *                                               *
 *                   CONSTANTS                   *
 *                                               *
 ------------------------------------------------*/


/** Override your own PHEx version here, if not InfiniteZero will use the latest PHEx version. (updated manually by ProdigyPNP admins)
 * CAUTION: PHEx will prompt to update if the version does not math this one's version. */
export const VERSION : string = "" || "2.2.1";

/** If you do not want to run the HTTPS server, change this to false.
 * CAUTION: You will then need a seperate method to get HTTPS (or have none). */
export const HTTPS : boolean = true;

/** Insert your own path to the privatekey.pem SSL certificate here. If not, InfiniteZero's default one will be used.
 * CAUTION: Remember to use the full path, and change this to YOUR DOMAIN's SSL Certificate. DO NOT LEAK THIS FILE. */
export const HTTPS_KEY_PATH : string = "" || "/etc/letsencrypt/live/infinitezero.net/privkey.pem";

/** Insert your own path to the fullchain.pem SSL certificate here. If not, InfiniteZero's default one will be used.
 * CAUTION: Remember to use the full path, and change this to YOUR DOMAIN's SSL Certificate. */
export const HTTPS_CHAIN_PATH : string = "" || "/etc/letsencrypt/live/infinitezero.net/fullchain.pem";

/** Insert your own contents of index.html here, if not InfiniteZero's normal index.html will be used.
 * CAUTION: Remember that this is the exported main page of the site. Be wise. */
export const INDEX_HTML : string = "" || fs.readFileSync(__dirname.substring(0, __dirname.length - 5) + "/html/index.html", "utf8").valueOf();

/** Insert your own contents of style.css here, if not InfiniteZero's normal style.css will be used.
 * CAUTION: This is exported at `infinitezero.net/style.css`. Remember to insert a stylesheet link in index.html to use this. */
export const STYLE_CSS : string = "" || fs.readFileSync(__dirname.substring(0, __dirname.length - 5) + "/html/style.css", "utf8").valueOf();

/** Replace 0 with your own server port here, if not it'll default to 443.
 * CAUTION: Remeber that server port 80 is the default http port, and port 443 is the default HTTPS port. */
export const HTTPS_PORT : number = 0 || 443;

/** Replace 0 with your own server port here, if not it'll default to 80.
 * CAUTION: Remeber that server port 80 is the default http port, and port 443 is the default HTTPS port. */
export const HTTP_PORT : number = 0 || 80;