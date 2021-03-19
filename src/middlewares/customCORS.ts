import { returnCodes } from "../config/utils";
import express from 'express';

function cors(req: express.Request, res: express.Response, next: express.NextFunction) {
    const origin = req.get('origin');

    // each request must have origin, and response must allow origin
    // because each request sends cookies it must have withCredentials: true and
    // response must have allow-credentials: true.
    res.set('Access-Control-Allow-Origin', origin || "");
    res.set('Access-Control-Allow-Credentials', 'true');

    if (req.method === "OPTIONS") {
        const headers = {
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Custom-Header, Authorization',
        };

        res.writeHead(returnCodes.noContent, headers);
        res.end();
        return;
    }
    
    next();
}
export default cors;