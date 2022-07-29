import * as fs from "fs";
import express from "express";
import https from "https";
import http from "http";
import cors from "cors";
import { getURL } from "./loadBalancer/loadBalancer";
import { Analytics, CountUniqueIPs } from "./analytics";
import { VERSION, HTTPS, HTTPS_KEY_PATH, HTTPS_CHAIN_PATH, INDEX_HTML, STYLE_CSS, HTTP_PORT, HTTPS_PORT } from "./constants";


export function StartServer () : void {

    const app = express();
    app.use(cors());

    

    /** WEBSITE */

    // Index.html
    app.get("/", (req, res) => {
        res.status(200).type("text/html").send(INDEX_HTML);
    });
    
    
    // Style.css
    app.get("/style.css", (req, res) => {
        res.status(200).type("text/css").send(STYLE_CSS);
    });

    // favicon.png
    app.get("/favicon.png", (req, res) => {
    
        // Removing /dist/ from the file uri. A messy way to do this, but it works (for now)
        res.status(200).type("image/png").sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/favicon.png");
    });

    // favicon.ico
    app.get("/favicon.ico", (req, res) => {
    
        // Removing /dist/ from the file uri. A messy way to do this, but it works (for now)
        res.status(200).type("image/png").sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/favicon.png");
    });
    /** WEBSITE */





    /** ANALYTICS */

    // analytics.json
    app.get("/analytics.json", (req, res) => {

        // Removing /dist/ from the file uri. A messy way to do this, but it works (for now)
        res.status(200).type("text/json").sendFile(__dirname.substring(0, __dirname.length - 5) + "/analytics/all.json");
    });

    // uniques
    app.get("/uniques", (req, res) => {
        res.status(200).type("text/plain").send(CountUniqueIPs().toString());
    });
    /** ANALYTICS */


    


    // Version
    app.get("/version", (req, res) => {
        res.status(200).type("text/plain").send(VERSION);
    });







    /** USED BY PHEX */
    
    // Add P-NP substitutes
    app.get("/eval/version", (req, res) => {
        res.status(200).type("text/plain").send(VERSION);
    });



    // eval
    app.get("/eval*", (req, res) => {

        Analytics(req);

        res.status(200).type("text/js").send(`
(async () => {
    eval(await (await fetch("${getURL()}/game.min.js")).text());
})();
`);
    });


    // The domain
    app.get("*", (req, res) => {
        res.status(200).type("text/plain").send(getURL());
    });
    /** USED BY PHEX */








    /* HTTPS Server */
    var httpsServer;
    if (HTTPS.valueOf()) { 
        httpsServer = https.createServer({
            key: fs.readFileSync(HTTPS_KEY_PATH),
            cert: fs.readFileSync(HTTPS_CHAIN_PATH),
          }, app);

          // HTTPS server starts listening the `HTTPS_PORT`
        httpsServer.listen(HTTPS_PORT, () => {
            console.log(`HTTPS Server running at: http://localhost:${HTTPS_PORT}/`);
         });
    }
    /* HTTPS Server */

      
    /* HTTP Server */
    const httpServer = http.createServer(app);
    httpServer.listen(HTTP_PORT, () => {
        console.log(`HTTP Server running at: http://localhost:${HTTP_PORT}/`);
    });
    /* HTTP Server */
}