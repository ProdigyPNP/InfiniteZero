import * as fs from "fs";
export var UniqueIPs;
export function Analytics(req) {
    console.log("Req [");
    console.log("IP: {" + req.ip.toString() + "}. Unique: {" + AddUniqueIP(req) + "}");
    console.log("REQUEST: " + request(req));
    console.log("] Req");
}
export function CountUniqueIPs() {
    const AllIPs = fs.readFileSync("./analytics/UniqueIPs.txt", "utf8").split("\n");
    const out = AllIPs.length;
    UniqueIPs = out;
    return out;
}
function request(req) {
    const IP = req.ip.toString();
    const UserAgent = new String(req.headers["user-agent"]).valueOf();
    const DateTime = new Date(Date.now()).toString();
    const Path = req.path.toString();
    const out = JSON.stringify({ IP, UserAgent, DateTime, Path });
    fs.appendFileSync("./analytics/all.json", out + "\n");
    return out;
}
function AddUniqueIP(req) {
    const IP = req.ip.toString();
    const AllIPs = fs.readFileSync("./analytics/UniqueIPs.txt", "utf8").split("\n");
    if (AllIPs.includes(IP)) {
        return false;
    }
    else {
        fs.appendFileSync("./analytics/UniqueIPs.txt", IP + "\n");
        return true;
    }
}
//# sourceMappingURL=analytics.js.map