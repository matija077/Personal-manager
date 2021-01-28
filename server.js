var express = require('express');
var { cors } = require('./src/middlewares/customCORS.ts');
var { configServerMiddlewares } = require('./src/config/serverConfig.ts');
var { PORT } = require('./src/config/utils.ts');

var auth = require('./src/routes/api/auth.route.ts');

var { resolvers, server: graphServer } = require('./src/graphql.ts');

var port = process.env.PORT || PORT;
console.log(port);

require("./src/db/initialize.ts");

var app = express();

configServerMiddlewares(app);

/*app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", function(req, res) {
    res.sendFile(path.join(_-__dirname, "client/build", "index.html"));
})*/

//graphql middleware
graphServer.applyMiddleware({app, path: "/graphql"})

app.use("/api*", cors);

//routes
app.post('/api/verifyToken', auth.verifyToken);


//require(path.join(__dirname, "src", "routes", "routes.route.ts"))(app);

function running(error) {
    if (error) {
        console.log(error);
    }
}
app.listen(port, running);


/*
* servies
* db
* config
* models
* rotues
* static */