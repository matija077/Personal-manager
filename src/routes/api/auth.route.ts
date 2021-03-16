import express, { CookieOptions, NextFunction } from "express";
const router = express.Router();
import handleToken from '../../middlewares/handleToken.middleware';
import { authenticate } from '../../services/auth.service';
import { createToken, createRefreshToken } from '../../services/token.service';

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
function createAndSetRefreshTokenCookie( token: string, res: express.Response) {
    createAndSetCookie("refreshToken", token, undefined, res);
}

router
    .post("/authenticate", async (req: express.Request, res: express.Response, next: NextFunction) => {
        const {email, password}: {email: string, password: string} = req.body;

        try {
            const { isMatched: isAuthenticated, nickname } = await authenticate({email, password});
            const { token = "", expiresIn = "" } = nickname ? await createToken(nickname) : {};
            const refreshToken = nickname? await createRefreshToken(nickname) : undefined;

            refreshToken && createAndSetRefreshTokenCookie(refreshToken, res);

            res.json({isAuthenticated, nickname, token, expiresIn});

        } catch (error: any) {
            next(error);
        }
    })

    .post("/refreshToken", handleToken,  async (req: express.Request, res: express.Response, next: NextFunction) => {
        res.json(req.cookies);
        console.log(req.headers.cookie);

        // TODO -veryf token adn read data



    })

    .get("/verifyToken", async (req: express.Request, res: express.Response) => {
    })

export default router;