import express from "express";
const router = express.Router();
import { authenticate } from '../../services/auth.service';
import { createToken } from '../../services/token.service';
import { returnCodes } from '../../config/utils';

router
    .post("/authenticate", async (req: express.Request, res: express.Response) => {
        const {email, password}: {email: string, password: string} = req.body;

        try {
            const { isMatched: isAuthenticated, nickname } = await authenticate({email, password});
            const token = nickname? await createToken(nickname) : undefined;

            res.json({isAuthenticated, nickname, token});

        } catch (error: any) {
            res.status(returnCodes.error).send("something went wrong");
        }           
    })

    .get("/verifyToken", async (req: express.Request, res: express.Response) => {
    })

export default router;