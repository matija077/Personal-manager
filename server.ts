import express from 'express';
import cors from './src/middlewares/customCORS';
import configServerMiddlewares from './src/config/serverConfig';
import { PORT } from './src/config/utils';
import path from 'path';

import auth from './src/routes/api/auth.route';
import users from './src/routes/api/users';
import handleToken from './src/middlewares/handleToken';
var { resolvers, server: graphServer } = require('./src/graphql.ts');
import errorHandling from './src/middlewares/errorHandling';

var port = process.env.PORT || PORT;

// initlaize necessary apps
var client = require("./src/db/initialize.ts");

var app = express();

//middlewares for all routes
configServerMiddlewares(app);


//routes specifci middlewares
app.use("/api*", cors);

//graphql middleware
graphServer.applyMiddleware({app, path: "/graphql"})

//for testing tokens
//app.use("/api*", handleToken);

// routes
app.use("/api/users", users);
//routes TODO - move
app.use('/api/auth', auth);

// handling errors ase the last middleware
app.use(errorHandling);

//require(path.join(__dirname, "src", "routes", "routes.route.ts"))(app);


//static files
if (process.env.NODE_ENV === "production") {
    const frontEndBuildDir = "new_client/public"
    app.use(express.static(path.join(__dirname, frontEndBuildDir)))
    //if no specific routes match return our index.html
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname, frontEndBuildDir, "./index.html"));
    });
    /*app.use(express.static(path.join(__dirname, "client/build")));
    app.get("*", function(req, res) {
        res.sendFile(path.join(_-__dirname, "client/build", "index.html"));
    })*/
}


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