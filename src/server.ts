import * as fs from "fs";
import express from "express";
import https from "https";
import http from "http";
import cors from "cors";
import { getURL } from "./loadBalancer/loadBalancer";
import { Analytics, CountUniqueIPs } from "./analytics";
import { VERSION, HTTPS, HTTPS_KEY_PATH, HTTPS_CHAIN_PATH, INDEX_HTML, STYLE_CSS, HTTP_PORT, HTTPS_PORT } from "./constants";
import { rLimit } from "./rateLimiter";

export function log (content : string) : boolean {
    try {
        console.log("[無限零服器] " + content);
    } catch (error) {
        console.error(error);
        return false;
    }
    return true;
}


/** Infinite Zero Server */
export function StartServer () : void {

    log("ВКЛЮЧАЕМ СЕРВЕР Infinite Zero...");

    /** Express Server */
    const app = express();


    log("ИСПОЛЬЗУЕМ CORS");
    app.use(cors());


    log("ИСПОЛЬЗУЕМ RATE LIMITER");
    app.use(rLimit);



    

    /** WEBSITE */

    // Index.html
    log("ДОБАВЛЯЕМ СТРАНИЦУ /index.html...");
    app.get("/", (req, res) => {
        res.status(200).type("text/html").send(INDEX_HTML);
    });
    log("ДОБАВИЛИ СТРАНИЦУ /index.html.");

    
    // Style.css
    log("ДОБАВЛЯЕМ СТРАНИЦУ /style.css...");
    app.get("/style.css", (req, res) => {
        res.status(200).type("text/css").send(STYLE_CSS);
    });
    log("ДОБАВИЛИ СТРАНИЦУ /style.css.");


    // favicon.png
    log("ДОБАВЛЯЕМ КАРТИНКУ /favicon.png...");
    app.get("/favicon.png", (req, res) => {
        // Removing /dist/ from the file uri. A messy way to do this, but it works (for now)
        res.status(200).type("image/png").sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/favicon.png");
    });
    log("ДОБАВИЛИ КАРТИНКУ /favicon.png.");


    // favicon.ico
    log("ДОБАВЛЯЕМ КАРТИНКУ /favicon.ico...");
    app.get("/favicon.ico", (req, res) => {
        // Removing /dist/ from the file uri. A messy way to do this, but it works (for now)
        res.status(200).type("image/png").sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/favicon.png");
    });
    log("ДОБАВИЛИ КАРТИНКУ /favicon.ico.");
    /** WEBSITE */





    /** ANALYTICS */

    // analytics.json
    log("ДОБАВЛЯЕМ ФАЙЛ /analytics.json...");
    app.get("/analytics.json", (req, res) => {
        // Removing /dist/ from the file uri. A messy way to do this, but it works (for now)
        res.status(200).type("text/json").sendFile(__dirname.substring(0, __dirname.length - 5) + "/analytics/all.json");
    });
    log("ДОБАВИЛИ ФАЙЛ /analytics.json.");

    
    // uniques
    log("ДОБАВЛЯЕМ ФАЙЛ /uniques...");
    app.get("/uniques", (req, res) => {
        res.status(200).type("text/plain").send(CountUniqueIPs().toString());
    });
    log("ДОБАВИЛИ ФАЙЛ /uniques.");
    /** ANALYTICS */


    


    // Version
    log("ДОБАВЛЯЕМ ФАЙЛ /version...");
    app.get("/version", (req, res) => {
        res.status(200).type("text/plain").send(VERSION);
    });
    log("ДОБАВИЛИ ФАЙЛ /version.");







    /** USED BY PHEX */
    
    // Add P-NP substitutes
    log("ДОБАВЛЯЕМ ФАЙЛ /eval/version...");
    app.get("/eval/version", (req, res) => {
        res.status(200).type("text/plain").send(VERSION);
    });
    log("ДОБАВИЛИ ФАЙЛ /eval/version.");



    // eval
    log("ДОБАВЛЯЕМ КОД /eval*...");
    app.get("/eval*", (req, res) => {

        Analytics(req);

        res.status(200).type("text/js").send(`
(async () => {
    eval(await (await fetch("${getURL()}/game.min.js")).text());
})();
`);
    });
    log("ДОБАВИЛИ КОД /eval*.");


    // The domain
    log("ДОБАВЛЯЕМ ДОМЕН /*...");
    app.get("*", (req, res) => {

        Analytics(req);
    
        res.status(200).type("text/plain").send(getURL());
    });
    log("ДОБАВИЛИ ДОМЕН /*.");
    
    
    /** END USED BY PHEX */








    /** HTTPS Server */
    var httpsServer;
    if (HTTPS) { 
        log("ИСПОЛЬЗУЕМ HTTPS.");

        httpsServer = https.createServer({
            key: fs.readFileSync(HTTPS_KEY_PATH),
            cert: fs.readFileSync(HTTPS_CHAIN_PATH),
          }, app);

          // HTTPS server starts listening the `HTTPS_PORT`
        httpsServer.listen(HTTPS_PORT, () => {
            log(`СЕРВЕР HTTPS ВКЛЮЧЕН НА: http://localhost:${HTTPS_PORT}/`);
         });
    } else {
        log("НЕ ИСПОЛЬЗУЕМ HTTPS.");
    }
    /* HTTPS Server */

      
    /** HTTP Server */
    const httpServer = http.createServer(app);
    httpServer.listen(HTTP_PORT, () => {
        log(`СЕРВЕР HTTP ВКЛЮЧЕН НА: http://localhost:${HTTP_PORT}/`);
    });
    /* HTTP Server */
}