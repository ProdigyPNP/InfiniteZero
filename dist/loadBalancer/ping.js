"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const url = "https://pnpb.erisws.com";
(async () => {
    try {
        const response = await (0, got_1.default)(url, {
            throwHttpErrors: false
        });
        console.log("Status Code : " + response.statusCode);
    }
    catch (error) {
        console.error(error);
    }
})();
//# sourceMappingURL=ping.js.map