"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getURL = exports.URLs = void 0;
exports.URLs = [
    "https://hacks.prodigypnp.com"
];
const Random = require("crypto-random");
function getURL() {
    const generated = Random.range(0, exports.URLs.length - 1);
    return new String(exports.URLs[generated]).valueOf();
}
exports.getURL = getURL;
//# sourceMappingURL=loadBalancer.js.map