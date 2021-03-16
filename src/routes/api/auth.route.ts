import express, { NextFunction } from "express";
const router = express.Router();
import { authenticate } from '../../services/auth.service';
import { createToken, createRefreshToken } from '../../services/token.service';


router
    .post("/authenticate", async (req: express.Request, res: express.Response, next: NextFunction) => {
        const {email, password}: {email: string, password: string} = req.body;

        try {
            const { isMatched: isAuthenticated, nickname } = await authenticate({email, password});
            const token = nickname? await createToken(nickname) : undefined;
            const refreshToken = nickname? await createRefreshToken(nickname) : undefined;

            res.cookie(
                "refreshToken",
                refreshToken,
                {
                    maxAge: 17280000000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                }

            )

            /**
             *  {
                    maxAge: 17280000000,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production'? true: false,
                    sameSite: "none"
                }
            */

            /*res.cookie(
                "a",
                "2"
            )*/

            res.json({isAuthenticated, nickname, token});

        } catch (error: any) {
            next(error);
        }
    })

    .post("/refreshToken", async (req: express.Request, res: express.Response, next: NextFunction) => {
        res.json(req.cookies);
        console.log(req.headers.cookie);
    })

    .get("/verifyToken", async (req: express.Request, res: express.Response) => {
    })

export default router;