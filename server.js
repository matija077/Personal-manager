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

app.listen(port, function running(error) {
    if (error) {
        console.log(error);
    }
})