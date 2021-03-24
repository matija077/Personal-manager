import express, { CookieOptions, NextFunction } from "express";
const router = express.Router();
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
import { tokenEnum,REFRESH_TOKEN } from "../../utility/types";

const cookieOptions: CookieOptions = {
    maxAge: 17280000000,
    httpOnly: true,
    secure: true,
    sameSite: "none"
}
function createAndSetCookie(name: string, token: string, options: CookieOptions = cookieOptions, res: express.Response) {
    res.cookie(
        name,
        token,
        options
    )
}
function setRefreshTokenCookie( token: string, res: express.Response) {
    createAndSetCookie(REFRESH_TOKEN, token, undefined, res);
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

            refreshToken && setRefreshTokenCookie(refreshToken, res);
            storeRefreshToken(refreshTokenExpiresIn, options.jwtid);

            res.json({isAuthenticated, nickname, token, expiresIn: accessTokenExpiresIn});

        } catch (error: any) {
            next(error);
        }
    })

    .post("/refreshToken", handleRefreshTokenMiddleware, async (req: express.Request, res: express.Response, next: NextFunction) => {
        const token: refreshTokenPayload = res.locals.payload;

        try {
            const expired = await checkExpiredRefreshToken(token);

            revokeRefreshToken(token.jti);

            if (expired) {
               console.log("expired");
               // retur nsomething
            } else {
                console.log("still valid");
                // create new tokens
            }
        } catch(error: any) {
            next(error);
        }
    })

    .get("/verifyToken", async (req: express.Request, res: express.Response) => {
    })

export default router;