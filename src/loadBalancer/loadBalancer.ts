export const URLs : Array<String> = [
    "https://pnpb.erisws.com",
    "https://p-np.prodigypnp.repl.co",
    "https://pnp1.prodigypnp.repl.co",
    "https://pnp2.prodigypnp.repl.co",
    "https://pnp3.prodigypnp.repl.co",
    "https://pnp4.prodigypnp.repl.co",
    "https://pnp5.prodigypnp.repl.co",
]


export function getURL() : string {
    return new String(
        URLs[
            Math.floor(Math.random() * URLs.length)
        ]
    ).valueOf();
}




export function pingURL (url : String) {

    
}

