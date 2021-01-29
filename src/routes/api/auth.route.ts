import express from "express";

function authRoute(app: express.Application, params: unknown) {
    app.post('api/verifyToken', function(req, res) {
        console.log(req);
    })
    app.get('api/verifyToken', function(req, res) {
        console.log("asdadasdasd");
    })
}

function verifyToken(req: express.Request, res: express.Response) {
    console.warn("req arrived");
    console.log(req.body);
};

module.exports = Object.assign(module.exports, {
    authRoute,
    verifyToken
})

export {
    authRoute,
    verifyToken
};