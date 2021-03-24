import express, { CookieOptions, NextFunction } from "express";
const router = express.Router();
import { handleRefreshTokenMiddleware } from '../../middlewares/handleToken.middleware';
import { authenticate } from '../../services/auth.service';
import { createToken, createRefreshToken } from '../../services/token.service';
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
            const { token = "", expiresIn = "" } = nickname ? await createToken(nickname) : {};
            const refreshToken = nickname? await createRefreshToken(nickname) : undefined;

            refreshToken && setRefreshTokenCookie(refreshToken, res);
            //refreshToken && setRefreshTokenState(refreshToken, nickname);

            res.json({isAuthenticated, nickname, token, expiresIn});

        } catch (error: any) {
            next(error);
        }
    })

    .post("/refreshToken", handleRefreshTokenMiddleware, async (req: express.Request, res: express.Response, next: NextFunction) => {
       


    })

    .get("/verifyToken", async (req: express.Request, res: express.Response) => {
    })

export default router;