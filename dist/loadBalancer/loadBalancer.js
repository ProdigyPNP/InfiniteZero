import Random from "crypto-random";
export const URLs = [
    "https://hacks.prodigypnp.com"
];
export function getURL() {
    const generated = Random.range(0, URLs.length - 1);
    return new String(URLs[generated]).valueOf();
}
//# sourceMappingURL=loadBalancer.js.map