var express = require('express');
var path = require('path');
var helmet = require('helmet');
var auth = require('./src/routes/api/auth.route.ts');

var { resolvers, server: graphServer } = require('./src/graphql.ts');

const PORT = 5010;
const returnCodes = {
    'error': 500,
    'ok': 200,
    'noContent': 204
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

//midlewares
app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api*', function cors(req, res, next) {
    console.log(req.get('origin'));
    const origin = req.get('origin');


    if (req.method === "OPTIONS") {
        const headers = {
            'Access-Control-Allow-Origin' : `${origin}`,
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        };

        res.writeHead(returnCodes.noContent, headers);
        res.end();
        return;
    }

    next();
});


//graphql middleware
graphServer.applyMiddleware({app, path: "/graphql"})

//routes
app.post('/api/verifyToken', auth.verifyToken);


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