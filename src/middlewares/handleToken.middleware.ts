import { returnCodes } from "../config/utils";
import { getRefreshToken, getToken } from '../utility/utilty';
import express from 'express';
import jwt from 'jsonwebtoken';
import { tokenEnum } from '../utility/types';
import { verifyToken } from '../services/token.service';

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

    let token = getRefreshToken(cookie);

    if (!token) {
        return res.sendStatus(returnCodes.forbidden)
    }

    token = token as string;
    verifyToken(
        token,
        tokenEnum.REFRESH_TOKEN_SECRET,
        (payload: Object | undefined) => {
            res.locals.payload = payload;

            next();
        },
        () => {
            res.sendStatus(returnCodes.forbidden)
        },
        {
            ignoreExpiration: true
        }
    );
 }

export {
    handleTokenMiddleware,
    handleRefreshTokenMiddleware
};
