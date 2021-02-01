const express = require("express");
const router = express.Router();

/*function users(app) {
    app.get("/test", () => {
        console.log("uspjeh2");
    });


    return defaultMiddleware;
}*/

router
    .get("/test", () => {
        console.log("uspjeh2");
    });

export default router;