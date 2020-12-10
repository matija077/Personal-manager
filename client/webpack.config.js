var HtmlWebPackPlugin = require('html-webpack-plugin');
var path = require("path");

var exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname + "/build"),
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname + '/public/index.html')
        })
    ]
};

Object.assign(module.exports, exports);