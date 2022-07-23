import * as fs from "fs";

export function Analytics (req : any) {

    console.log("IP " + req.ip.toString() + AddUniqueIP(req));
    console.log(request(req));

}

function request (req : any) : string {

    const IP : string = req.ip.toString();
    const UserAgent : string = new String(req.headers["user-agent"]).valueOf();
    const DateTime : string = new Date(Date.now()).toString();
    const Path : string = req.path.toString();

    const out : string = JSON.stringify({IP, UserAgent, DateTime, Path});

    fs.appendFileSync("./analytics/all.json", IP + "\n");


    return out;
}



function AddUniqueIP (req : any) : boolean {

    const IP : string = req.ip.toString();
    const AllIPs : string[] = fs.readFileSync("./analytics/UniqueIPs.txt", "utf8").split("\n");

    if (AllIPs.includes(IP)) {
        return false;
    } else {
        fs.appendFileSync("./analytics/UniqueIPs.txt", IP + "\n");
        return true;
    }

}