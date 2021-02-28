import { returnCodes } from "../config/utils";
import { getToken } from '../utility/utilty';
import express from 'express';
import jwt from 'jsonwebtoken';

function handleTokenMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;

    const token = getToken(authHeader);

    if (token) {
        jwt.verify(token, process.env.TOKEN as string, (error, payload) => {
            if (error) {
                res.sendStatus(returnCodes.unauthorized);
            }
            
            next();
        })
    } else {
        res.sendStatus(returnCodes.forbidden);
    }
}

export default handleTokenMiddleware;
