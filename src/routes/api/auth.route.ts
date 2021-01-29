import express from "express";
const router = express.Router();

router
    .get("/verifyToken", (req: express.Request, res: express.Response) => {
        console.log("upsjeh");
    })

export default router;