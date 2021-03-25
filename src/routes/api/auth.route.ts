import express, { CookieOptions, NextFunction } from "express";
const router = express.Router();
import { returnCodes } from '../../config/utils';
import { handleRefreshTokenMiddleware } from '../../middlewares/handleToken.middleware';
import { authenticate } from '../../services/auth.service';
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
function setRefreshTokenCookie( token: string, maxAge: number, res: express.Response) {
    // maxAge is in milsieconds and we are workign with seconds
    // 100 secodns will be added range of error
    const conversionFactor = 1000;
    //const maxAgeWithSafeRange = maxAge * conversionFactor + 100 * conversionFactor;
    const maxAgeWithSafeRange = maxAge * conversionFactor
   // console.log(maxAgeWithSafeRange);
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

            const { token = "", expiresIn: accessTokenExpiresIn = "" } = nickname ? await createAccessToken(nickname) : {} as createAccessTokenType;
            const {
                token: newRefreshToken = "",
                expiresIn: refreshTokenExpiresIn = "",
                options
            } = nickname? await createRefreshToken(nickname) : {} as createRefreshTokenType;

            refreshToken && setRefreshTokenCookie(newRefreshToken, parseInt(refreshTokenExpiresIn), res);
            storeRefreshToken(refreshTokenExpiresIn, options.jwtid);

            res.json({isAuthenticated, nickname, token, expiresIn: accessTokenExpiresIn});
        } catch(error: any) {
            next(error);
        }
    })

export default router;