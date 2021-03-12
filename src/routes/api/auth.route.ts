import express, { NextFunction } from "express";
const router = express.Router();
import { authenticate } from '../../services/auth.service';
import { createToken, createRefrehToken } from '../../services/token.service';


router
    .post("/authenticate", async (req: express.Request, res: express.Response, next: NextFunction) => {
        const {email, password}: {email: string, password: string} = req.body;

        try {
            const { isMatched: isAuthenticated, nickname } = await authenticate({email, password});
            const token = nickname? await createToken(nickname) : undefined;
            const refreshToken = nickname? await createRefrehToken(nickname) : undefined;

            res.json({isAuthenticated, nickname, token, refreshToken});

        } catch (error: any) {
            next(error);
        }
    })

    .get("/verifyToken", async (req: express.Request, res: express.Response) => {
    })

export default router;