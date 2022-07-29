import * as fs from "fs";

export var UniqueIPs : number;

export function Analytics (req : any) : void {

    console.log("Req [")
    console.log("IP: {" + req.ip.toString() + "}. Unique: {" + AddUniqueIP(req) + "}");
    console.log("REQUEST: " + request(req));
    console.log("] Req");

}



export function CountUniqueIPs () : number {

    const AllIPs : string[] = fs.readFileSync("./analytics/UniqueIPs.txt", "utf8").split("\n");
    const out : number = AllIPs.length;

    UniqueIPs = out;

    return out;
}


function request (req : any) : string {

    const IP : string = req.ip.toString();
    const UserAgent : string = new String(req.headers["user-agent"]).valueOf();
    const DateTime : string = new Date(Date.now()).toString();
    const Path : string = req.path.toString();

    const out : string = JSON.stringify({IP, UserAgent, DateTime, Path});

    fs.appendFileSync("./analytics/all.json", out + "\n");


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