import express from 'express';
import cors from './src/middlewares/customCORS';
import configServerMiddlewares from './src/config/serverConfig';
import { PORT } from './src/config/utils';

import auth from './src/routes/api/auth.route';
import users from './src/routes/api/users';
import handleToken from './src/middlewares/handleToken';
var { resolvers, server: graphServer } = require('./src/graphql.ts');
import errorHandling from './src/middlewares/errorHandling';

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
//for testing tokens
//app.use("/api*", handleToken);

app.use("/api/users", users);
//routes TODO - move
app.use('/api/auth', auth);

// handling errors ase the last middleware
app.use(errorHandling);

//require(path.join(__dirname, "src", "routes", "routes.route.ts"))(app);

function running(error: any) {
    if (error) {
        console.log(error);
    }
}
app.listen(port);

/*
* servies
* db
* config
* models
* rotues
* static */