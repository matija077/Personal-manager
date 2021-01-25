var express = require('express');
var path = require('path');
var auth = require('./src/routes/api/auth.route.ts');

var { resolvers, server: graphServer } = require('./src/graphql.ts');

const PORT = 5010;
const returnCodes = {
    'error': 500,
    'ok': 200
};

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var app = express();
var port = process.env.PORT || PORT;

/*app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", function(req, res) {
    res.sendFile(path.join(_-__dirname, "client/build", "index.html"));
})*/
app.use('/api*', function cors(req, res, next) {
    console.log(req.get('origin'));
    const origin = req.get('origin');
    const headers = {
        'Access-Control-Allow-Origin' : `${origin}`,
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    next();
});
app.post('/api/verifyToken', auth.verifyToken);
graphServer.applyMiddleware({app, path: "/graphql"})

//require(path.join(__dirname, "src", "routes", "routes.route.ts"))(app);

app.listen(port, running);
    /*then(function resolved(result) {
        console.log("resovled");

    }).
    catch(function rejected(error) {
        console.log("error while loadign routes");
        console.log(error);
    }).
    finally(function onFinally() {

    }
);*/

//console.log(app._router.stack);

function running(error) {
    if (error) {
        console.log(error);
    }
}