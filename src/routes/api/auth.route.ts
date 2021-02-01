import express from "express";
const router = express.Router();
import { authenticate } from '../../services/auth.service';
import { returnCodes } from '../../config/utils';

router
    .post("/authenticate", async (req: express.Request, res: express.Response) => {
        const {email, password}: {email: string, password: string} = req.body;
        const { isMatched: isAuthenticated, error } = await authenticate({email, password});

        if (error) {
            res.status(returnCodes.error).send("something went wrong");
        } else {
            res.send({isAuthenticated});
        }
    })

    .get("/verifyToken", async (req: express.Request, res: express.Response) => {
    })

export default router;