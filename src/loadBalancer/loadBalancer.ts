// @ts-expect-error
import Random from "crypto-random";

export const URLs : Array<string> = [
    "https://hacks.prodigypnp.com"
    /*
    "https://p-np.prodigypnp.repl.co",
    "https://pnp.prodigypnp.repl.co",
    "https://pnp1.prodigypnp.repl.co",
    "https://pnp2.prodigypnp.repl.co",
    "https://pnp3.prodigypnp.repl.co",
    "https://pnp4.prodigypnp.repl.co",
    "https://pnp5.prodigypnp.repl.co", */
]




export function getURL() : string {

    const generated : number = Random.range(0, URLs.length - 1);

    return new String(URLs[generated]).valueOf();
}
