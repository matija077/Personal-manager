import express from "express";
const router = express.Router();
import { authenticate } from '../../services/auth.service';

router
    .get("/verifyToken", (req: express.Request, res: express.Response) => {
        console.log("upsjeh");
    })

    authenticate({id: "1", password: "1234"});

export default router;