import { returnCodes } from "../config/utils";
import express from 'express';
import { auth } from "../../new_client/src/redux/utils.firebase";

function handleToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        console.log(authHeader);
    }

    next();

}

export default handleToken;
