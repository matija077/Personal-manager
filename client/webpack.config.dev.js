var HtmlWebPackPlugin = require('html-webpack-plugin');
var path = require("path");

var exports = {
    mode: 'development',
    entry: {
        index: './src/index.tsx'
    },
    output: {
        path: path.resolve(__dirname + "/build"),
        filename: 'index.bundle.js'
    },

    serve: {
        open: true,
        compress: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader','ts-loader'],
            },

            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', 'ts', 'js', 'jsx']
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname + '/public/index.html')
        })
    ]
};

/*
{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },

            devServer: {
        open: true,
        compress: true,
        hot: true,
    },
            */

Object.assign(module.exports, exports);