function authRoute(app, params) {
    app.post('api/verifyToken', function(req, res) {
        console.log(req);
    })
    app.get('api/verifyToken', function(req, res) {
        console.log("asdadasdasd");
    })
}

function verifyToken(req, res) {
    console.warn("req arrived");
    console.log(req.body);

};

module.exports = Object.assign(module.exports, {
    authRoute,
    verifyToken
})