import { returnCodes } from "../config/utils";
import { getRefreshToken, getToken, verifyToken } from '../utility/utilty';
import express from 'express';
import jwt from 'jsonwebtoken';
import { tokenEnum } from '../utility/types';

function handleTokenMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const cookie = req.headers.cookie;

    const token = getRefreshToken(cookie);

    if (token) {
        verifyToken(
            token,
            tokenEnum.TOKEN_SECRET,
            () => next(),
            () => res.sendStatus(returnCodes.unauthorized)
        );
    } else {
        res.sendStatus(returnCodes.unauthorized);
    }
}

function handleRefreshTokenMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const cookie = req.headers.cookie;

    const token = getRefreshToken(cookie);

    if (token) {
        verifyToken(
            token,
            tokenEnum.REFRESH_TOKEN_SECRET,
            () => next(),
            () => {

            }
        );
    } else {
        res.sendStatus(returnCodes.forbidden)
    }
 }

export {
    handleTokenMiddleware,
    handleRefreshTokenMiddleware
};
