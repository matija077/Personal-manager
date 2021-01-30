import express from "express";
const router = express.Router();
import { authenticate } from '../../services/auth.service';

router
    .get("/authenticate", async (req: express.Request, res: express.Response) => {
        const isAuthenticated = await authenticate({id: "1", password: "1234"});

        console.log(isAuthenticated);
        res.send(isAuthenticated);
    })

    .get("/verifyToken", async (req: express.Request, res: express.Response) => {
    })

export default router;