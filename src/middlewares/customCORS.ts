function cors(req, res, next) {
    if (req.method === "OPTIONS") {
        console.log("olaaaa");
        const headers = {
            'Access-Control-Allow-Origin' : `${origin}`,
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        };

        res.writeHead(returnCodes.noContent, headers);
        res.end();
        return;
    }

    next();
}

module.exports.cors = cors;