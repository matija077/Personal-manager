import { returnCodes } from "../config/utils";
import express from 'express';
import jwt from 'jsonwebtoken';

function handleToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        console.log(authHeader);
        // first part is Bearer. second part is the token
        const token = authHeader.split(' ')[1];

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

export default handleToken;
