import got from "got";

const url : string = "https://pnpb.erisws.com";
(async () => {
    try {
        
        const response = await got(url, {
            throwHttpErrors : false
        });
        
        console.log("Status Code : " + response.statusCode);
       
    } catch (error) {
     
        console.error(error);
     
    }
})();