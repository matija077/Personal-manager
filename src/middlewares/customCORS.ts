import { returnCodes } from "../config/utils";
import express from 'express';

function cors(req: express.Request, res: express.Response, next: express.NextFunction) {
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
export default cors;