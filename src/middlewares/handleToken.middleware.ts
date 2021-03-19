import { returnCodes } from "../config/utils";
import { getRefreshToken, getToken, verifyToken } from '../utility/utilty';
import express from 'express';
import jwt from 'jsonwebtoken';
import { tokenEnum } from '../utility/types';


function handleTokenMiddlewareWrapper(secretType: tokenEnum) {
    return function handleTokenMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
        let token: string | null = null;

        if (secretType === tokenEnum.TOKEN) {
            const authHeader = req.headers.authorization;

            token = getToken(authHeader);
        } else if (secretType === tokenEnum.REFRESHTOKEN) {
            const cookie = req.headers.cookie;
           
            token = getRefreshToken(cookie);
        }

        if (secretType === tokenEnum.REFRESHTOKEN) {
            console.log("token is " + token)
        }
        if (token) {
            verifyToken(token, secretType, () => next(), () => res.sendStatus(returnCodes.unauthorized));
        } else {
            res.sendStatus(returnCodes.unauthorized);
        }
    }
}

export default handleTokenMiddlewareWrapper;
