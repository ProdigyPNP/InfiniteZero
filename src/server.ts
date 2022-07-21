import express from "express";
import { getURL } from "./loadBalancer/loadBalancer";
import https from "https";
import http from "http";
import * as fs from "fs";
import cors from "cors";
import { VERSION } from "./constants";



export async function startServer_https () {

    const HTTPS_PORT : number = 443;
    const HTTP_PORT : number = 80;

    
    const app = express();

    app.use(cors());



    

    // Index.html
    app.get("/", (req, res) => {
        // Removing /dist/ from the file uri
        res.status(200).type("text/html").sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/index.html");
    });
    
    
    // Style.css
    app.get("/style.css", (req, res) => {
        // Removing /dist/ from the file uri
        res.status(200).type("text/css").sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/style.css");
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



    // Add P-NP substitutes
    app.get("/eval/version", (req, res) => {
        res.status(200).type("text/plain").send(VERSION);
    });






    // eval
    app.get("/eval*", (req, res) => {
        res.status(200).type("text/js").send(`
(async () => {
    eval(await (await fetch("${getURL()}/game.min.js")).text());
})();
`.replace("\n", ""));
    });


    // The domain
    app.get("*", function(req, res) {
    res.status(200).type("text/plain").send(getURL());
    });








    const httpsServer = https.createServer({
        key: fs.readFileSync("/etc/letsencrypt/live/infinitezero.net/privkey.pem"),
        cert: fs.readFileSync("/etc/letsencrypt/live/infinitezero.net/fullchain.pem"),
      }, app);
      
    const httpServer = http.createServer(app);
    

    // HTTPS server starts listening the `HTTPS_PORT`
    httpsServer.listen(HTTPS_PORT, () => {
        console.log(`HTTPS Server running at: http://localhost:${HTTPS_PORT}/`);
    });

    // HTTP server starts listening the `HTTP_PORT`
    httpServer.listen(HTTP_PORT, () => {
        console.log(`HTTP Server running at: http://localhost:${HTTP_PORT}/`);
    });
}