var fs = require('fs');
var path = require('path');

function router(app, params) {
    //console.log("sadasd" + path.resolve(__dirname));
    var apiPath = path.resolve(__dirname, "api");
    fs.readdirSync(apiPath).map(function(file) {
        //console.log(path.resolve(apiPath, file));
            require(path.resolve(apiPath, file))(app, params);
        }
    )
}

module.exports = router;