import { returnCodes } from "../config/utils";
import { getToken, verifyToken } from '../utility/utilty';
import express from 'express';
import jwt from 'jsonwebtoken';
import { tokenEnum } from '../utility/types';

function handleTokenMiddlewareWrapper(secretType: tokenEnum) {
    return function handleTokenMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
        const authHeader = req.headers.authorization;

        const token = getToken(authHeader);

        if (token) {
            verifyToken(token, secretType, () => next(), () => res.sendStatus(returnCodes.unauthorized));
        } else {
            res.sendStatus(returnCodes.unauthorized);
        }
    }
}

export default handleTokenMiddlewareWrapper;
