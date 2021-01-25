var express = require('express');
var path = require('path');

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
graphServer.applyMiddleware({app, path: "/graphql"})

require(path.join(__dirname, "src", "routes", "routes.route.ts"))(app);
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