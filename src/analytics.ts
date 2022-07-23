export function Analytics (req : any) {


    const IP : string = req.ip.toString();
    const UserAgent : string = new String(req.headers["user-agent"]).valueOf();
    const DateTime : string = new Date(Date.now()).toString();
    const Path : string = req.path.toString();


    console.log(JSON.stringify({IP, UserAgent, DateTime, Path}));

}