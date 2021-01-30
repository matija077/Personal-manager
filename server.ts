var express = require('express');
import cors from './src/middlewares/customCORS';
import configServerMiddlewares from './src/config/serverConfig';
import { PORT } from './src/config/utils';

import auth from './src/routes/api/auth.route';
import users from './src/routes/api/users';
var { resolvers, server: graphServer } = require('./src/graphql.ts');

var port = process.env.PORT || PORT;

var client = require("./src/db/initialize.ts");

var app = express();

configServerMiddlewares(app);

/*app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", function(req, res) {
    res.sendFile(path.join(_-__dirname, "client/build", "index.html"));
})*/

//graphql middleware
graphServer.applyMiddleware({app, path: "/graphql"})

app.use("/api*", cors);

app.use("/api/users", users);

//routes TODO - move
app.use('/api/auth', auth);


//require(path.join(__dirname, "src", "routes", "routes.route.ts"))(app);

function running(error: any) {
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