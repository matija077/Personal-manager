import express from 'express';

import { returnCodes } from '../config/utils';
import { errorLogging } from '..//services/logging.service';

function errorHandling(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    // TODO handle correct error or exception with respect to custom result
    console.log("usoa sma u midldeware");
    errorLogging("error", err);
    

    res.status(returnCodes.error).send("something went wrong");
}

export default errorHandling;