var HtmlWebPackPlugin = require('html-webpack-plugin');
var path = require("path");

var exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname + "/build"),
        filename: 'index.bundle.js'
    },
    devServer: {
        open: true,
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
                resolve: {
                    extensions: ['.js', '.jsx']
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname + '/public/index.html')
        })
    ]
};

Object.assign(module.exports, exports);