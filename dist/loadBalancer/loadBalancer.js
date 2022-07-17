"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingURL = exports.getURL = exports.URLs = void 0;
exports.URLs = [
    "https://pnpb.erisws.com",
    "https://p-np.prodigypnp.repl.co",
    "https://pnp1.prodigypnp.repl.co",
    "https://pnp2.prodigypnp.repl.co",
    "https://pnp3.prodigypnp.repl.co",
    "https://pnp4.prodigypnp.repl.co",
    "https://pnp5.prodigypnp.repl.co",
];
function getURL() {
    return new String(exports.URLs[Math.floor(Math.random() * exports.URLs.length)]).valueOf();
}
exports.getURL = getURL;
function pingURL(url) {
}
exports.pingURL = pingURL;
//# sourceMappingURL=loadBalancer.js.map