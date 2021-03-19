function parseCookies(key: string, cookies: string = ""): string {
    const cookiesArray = cookies.split(";");
    let returnValue = "";

    for (const cookie of cookiesArray) {
        //console.log(cookie);
        const cookieArray = cookie.split("=");
        //console.log("first " + cookieArray[0]);
        //console.log("key" + key);

        if (cookieArray[0] === key) {
            returnValue = cookieArray[1];
        }
    }

    //console.log("return " + returnValue);
    return returnValue;
} 

export default parseCookies;