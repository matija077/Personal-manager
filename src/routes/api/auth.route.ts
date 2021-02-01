import express from "express";
const router = express.Router();
import { authenticate } from '../../services/auth.service';
import { returnCodes } from '../../config/utils';

router
    .post("/authenticate", async (req: express.Request, res: express.Response) => {
        console.log(req.body);
        const {email, password}: {email: string, password: string} = req.body;
        const isAuthenticated = await authenticate({email, password});

        console.log(isAuthenticated);

        const origin = req.get('origin');
        /*const headers = {
            'Access-Control-Allow-Origin' : `${origin}`
        }*/

        //origin && res.setHeader('Access-Control-Allow-Origin',  origin);

        if (isAuthenticated === null) {
            res.status(returnCodes.error).send();
        } else {
            res.send(isAuthenticated);
        }
    })

    .get("/verifyToken", async (req: express.Request, res: express.Response) => {
    })

export default router;