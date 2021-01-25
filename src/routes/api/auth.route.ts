function authRoute(app, params) {
    //console.log("wokring");
    console.log(app._router.stack);
    app.post('api/verifyToken', function(req, res) {
        console.log(req);
    })
    app.get('api/verifyToken', function(req, res) {
        console.log("asdadasdasd");
    })
}

module.exports = authRoute;