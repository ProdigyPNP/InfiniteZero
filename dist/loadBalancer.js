"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingURL = exports.URLs = void 0;
const ping_1 = __importDefault(require("ping"));
exports.URLs = [
    "https://pnpb.erisws.com",
    "https://p-np.prodigypnp.repl.co",
    "https://pnp1.prodigypnp.repl.co",
    "https://pnp2.prodigypnp.repl.co",
    "https://pnp3.prodigypnp.repl.co",
    "https://pnp4.prodigypnp.repl.co",
    "https://pnp5.prodigypnp.repl.co",
];
function pingURL(url) {
    (async function () {
        const result = await ping_1.default.promise.probe('www.kindacode.com', {
            timeout: 10,
            extra: ["-i", "2"],
        });
        console.log(result);
    });
}
exports.pingURL = pingURL;
//# sourceMappingURL=loadBalancer.js.map