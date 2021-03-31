import express, { CookieOptions, NextFunction } from "express";
const router = express.Router();
import { returnCodes } from '../../config/utils';
import { handleRefreshTokenMiddleware } from '../../middlewares/handleToken.middleware';
import { authenticate } from '../../services/auth.service';
import { nextTick } from 'process';
import {
    createAccessToken,
    createRefreshToken,
    checkExpiredRefreshToken,
    storeRefreshToken,
    createAccessTokenType,
    createRefreshTokenType,
    revokeRefreshToken,
    refreshTokenPayload
} from '../../services/token.service';
import { tokenEnum, REFRESH_TOKEN } from "../../utility/types";


function createAndSetCookie(name: string, token: string, options: CookieOptions, res: express.Response) {
    const cookieDefaultOptions: CookieOptions = {
        maxAge: 17280000000,
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }

    res.cookie(
        name,
        token,
        {
            ...cookieDefaultOptions,
            ...options
        }
    )
}
// maxAge is in milsieconds and we are workign with seconds
// 100 secodns will be added range of error
function setRefreshTokenCookie( token: string, maxAge: number, res: express.Response) {
    const conversionFactor = 1000;
    const safeRange = parseInt(process.env.REFRESH_TOKEN_COOKIE_EXPIRES_RANGE || "100");

    const maxAgeWithSafeRange = maxAge * conversionFactor + safeRange * conversionFactor;

    createAndSetCookie(REFRESH_TOKEN, token, {maxAge: maxAgeWithSafeRange}, res);
}


router
    .post("/authenticate", async (req: express.Request, res: express.Response, next: NextFunction) => {
        const {email, password}: {email: string, password: string} = req.body;

        try {
            const { isMatched: isAuthenticated, nickname } = await authenticate({email, password});
            const { token = "", expiresIn: accessTokenExpiresIn = "" } = nickname ? await createAccessToken(nickname) : {} as createAccessTokenType;
            const {
                token: refreshToken = "",
                expiresIn: refreshTokenExpiresIn = "",
                options
            } = nickname? await createRefreshToken(nickname) : {} as createRefreshTokenType;

            refreshToken && setRefreshTokenCookie(refreshToken, parseInt(refreshTokenExpiresIn), res);
            storeRefreshToken(refreshTokenExpiresIn, options.jwtid);

            res.json({isAuthenticated, nickname, token, expiresIn: accessTokenExpiresIn});

        } catch (error: any) {
            next(error);
        }
    })

    /**
     * check for existance and valdiity of the token regardless of whe ndoes it expire i nthe mdidleware
     * check if it is expired
     * in any case revoke it
     * for new tokens we considered it authenticated. refresh token expiresIn -  datea.getTIme
     * is in miliseconds and we have to substract that from old refreshToens expiresIn to get
     * senconds to expire. both are in seocnds of epoch time.
     */
    .post("/refreshToken", handleRefreshTokenMiddleware, async (req: express.Request, res: express.Response, next: NextFunction) => {
        const refreshToken: refreshTokenPayload = res.locals.payload;

        try {
            const expired = await checkExpiredRefreshToken(refreshToken);

            revokeRefreshToken(refreshToken.jti);

            if (expired) {
               return res.sendStatus(returnCodes.unauthorized);
            }

            const { nickname } = refreshToken;
            const isAuthenticated = true;
            const refreshTokenExpiresInToSet = refreshToken.exp - Math.round(new Date().getTime()/1000);

            const { token = "", expiresIn: accessTokenExpiresIn = "" } = nickname ? await createAccessToken(nickname) : {} as createAccessTokenType;
            const {
                token: newRefreshToken = "",
                expiresIn: refreshTokenExpiresIn = "",
                options
            } = nickname
                ? await createRefreshToken(nickname, refreshTokenExpiresInToSet.toString())
                : {} as createRefreshTokenType;

            refreshToken && setRefreshTokenCookie(newRefreshToken, parseInt(refreshTokenExpiresIn), res);
            storeRefreshToken(refreshTokenExpiresIn, options.jwtid);

            res.json({isAuthenticated, nickname, token, expiresIn: accessTokenExpiresIn});
        } catch(error: any) {
            next(error);
        }
    })

    /**
     * async await seems like a wrong idea here. we do nto want to wait, we jsut want it done whne NodeJS can.
     */
    .post("/logout", handleRefreshTokenMiddleware,async (req: express.Request, res: express.Response, next: NextFunction) => {
        const { jti }: refreshTokenPayload = res.locals.payload;

        nextTick(() => {
            revokeRefreshToken(jti);
        })

        createAndSetCookie(REFRESH_TOKEN, "", {maxAge: 0}, res);
        res.sendStatus(returnCodes.noContent);
    })

export default router;