const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // This is the path to the core JavaScript file that will initialise the entire application.
    entry: './src/main/javascript/app.js',
    // This tells webpack to produce a sourcemap that helps with debugging the code.
    devtool: 'sourcemaps',
    output: {
        // Webpack will build the code into this directory.
        path: path.join(__dirname, './target/dist'),
        // This is the name of the final compacted file. It has a random hash added to bust any caching.
        filename: 'bundle.[hash].js'
    },
    module: {
        loaders: [
            {
                // This is the ES6 Webpack loader. It will pre-process any ES6 files.
                loader: 'babel-loader',
                // We assume all ES6 source files reside in the below directory.
                test: path.join(__dirname, './src/main/javascript'),
                // We also assume that all the JavaScript files within that directory contain ES6 code.
                include: /\.js$/,
                query: {
                    // These presets provide the babel compiler with support for both ES6 and React JSX.
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        // This plugin will generate the index.html file with a script tag pointing to the dynamic 'bundle.[hash].js'
        // name.
        new HtmlWebpackPlugin({
            template: 'src/main/html/index.html'
        })
    ]
};