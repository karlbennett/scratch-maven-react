const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // This is the path to the core JavaScript file that will initialise the entire application.
    entry: './src/main/js/index.js',
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        // Webpack will build the code into this directory.
        path: path.join(__dirname, './src/main/resources/resources'),
        // This is the name of the final compacted file.
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                // This is the ES6 Webpack loader. It will pre-process any ES6 file.
                loader: 'babel-loader',
                // We assume all ES6 source files reside in the below directory.
                test: path.join(__dirname, './src/main/js'),
                // We also assume that all the JavaScript files within the above directory contain ES6 code.
                include: /\.js$/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        // This plugin will generate the index.html file.
        new HtmlWebpackPlugin({
            title: 'Scratch Maven React'
        })
    ]
};