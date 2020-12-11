var express = require('express');

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

app.listen(port, function running(error) {
    if (error) {
        console.log(error);
    }
})