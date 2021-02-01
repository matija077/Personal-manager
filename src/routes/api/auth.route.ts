import express from "express";
const router = express.Router();
import { authenticate } from '../../services/auth.service';

router
    .post("/authenticate", async (req: express.Request, res: express.Response) => {
        console.log(req.body);
        const {id, password}: {id: string, password: string} = req.body;
        const isAuthenticated = await authenticate({id, password});

        console.log(isAuthenticated);

        const origin = req.get('origin');
        /*const headers = {
            'Access-Control-Allow-Origin' : `${origin}`
        }*/

        //origin && res.setHeader('Access-Control-Allow-Origin',  origin);
        res.send(isAuthenticated);
    })

    .get("/verifyToken", async (req: express.Request, res: express.Response) => {
    })

export default router;