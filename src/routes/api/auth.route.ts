import express, { CookieOptions, NextFunction } from "express";
const router = express.Router();
import { handleRefreshTokenMiddleware } from '../../middlewares/handleToken.middleware';
import { authenticate } from '../../services/auth.service';
import {
    createAccessToken,
    createRefreshToken,
    checkExpiredRefreshToken,
    createTokenReturnType
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

type refreshTokensType = {
    [key: string]: string
}
const refreshTokens: refreshTokensType = {};

router
    .post("/authenticate", async (req: express.Request, res: express.Response, next: NextFunction) => {
        const {email, password}: {email: string, password: string} = req.body;

        try {
            const { isMatched: isAuthenticated, nickname } = await authenticate({email, password});
            const { token = "", expiresIn: accessTokenExpiresIn = "" } = nickname ? await createAccessToken(nickname) : {};
            const {
                token: refreshToken = "",
                expiresIn: refreshTokenExpiresIn = "",
                options = {}
            } = nickname? await createRefreshToken(nickname) : {};

            refreshToken && setRefreshTokenCookie(refreshToken, res);
            //refreshToken && setRefreshTokenState(refreshToken, nickname);

            res.json({isAuthenticated, nickname, token, expiresIn: accessTokenExpiresIn});

        } catch (error: any) {
            next(error);
        }
    })

    .post("/refreshToken", handleRefreshTokenMiddleware, async (req: express.Request, res: express.Response, next: NextFunction) => {
        const token: string = res.locals.payload;

        try {
            const expired = await checkExpiredRefreshToken(token);

            if (expired) {
                // revoke
            } else {
                // create
            }
        } catch(error: any) {
            next(error);
        }
    })

    .get("/verifyToken", async (req: express.Request, res: express.Response) => {
    })

export default router;