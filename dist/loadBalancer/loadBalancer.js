"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingURL = exports.getURL = exports.URLs = void 0;
exports.URLs = [
    "https://pnpb.erisws.com",
    "https://p-np.prodigypnp.repl.co",
    "https://pnp.prodigypnp.repl.co",
    "https://pnp1.prodigypnp.repl.co",
    "https://pnp2.prodigypnp.repl.co",
    "https://pnp3.prodigypnp.repl.co",
    "https://pnp4.prodigypnp.repl.co",
    "https://pnp5.prodigypnp.repl.co",
];
const Random = require("crypto-random");
function getURL() {
    const generated = Random.range(0, exports.URLs.length - 1);
    return new String(exports.URLs[generated]).valueOf();
}
exports.getURL = getURL;
function pingURL(url) {
}
exports.pingURL = pingURL;
//# sourceMappingURL=loadBalancer.js.map