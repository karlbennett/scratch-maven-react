const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const mainDir = path.join(__dirname, './src/main');
const srcDir = path.join(mainDir, './javascript');
const outputDir = path.join(__dirname, './target/dist');

module.exports = {
    // This is the path to the core JavaScript file that will initialise the entire application.
    entry: path.join(srcDir, './app.js'),
    // This tells webpack to produce a sourcemap that helps with debugging the code.
    devtool: 'sourcemaps',
    output: {
        // Webpack will build the code into this directory.
        path: outputDir,
        // This is the name of the final compacted file. It has a random hash added to bust any caching.
        filename: 'bundle.[hash].js'
    },
    module: {
        loaders: [
            {
                // This is the ES6 Webpack loader. It will pre-process any ES6 files.
                loader: 'babel-loader',
                // We assume that all the JavaScript files contain ES6 code.
                test: /\.js$/,
                // We also assume all the source files reside in the below directory.
                include: srcDir,
                exclude: /spec\.js$/,
                query: {
                    // These presets provide the babel compiler with support for both ES6 and React JSX.
                    presets: ['es2015', 'react']
                }
            },
            {
                // This is the SASS loader. It will compile the SASS files. We have used the
                // 'extract-text-webpack-plugin' loader so that the CSS is compiled into an external file instead of
                // placed inline within the index.html.
                loader: ExtractTextPlugin.extract(["css", "sass"]),
                // We assume that all the SASS files end with '.scss'.
                test: /\.scss$/,
                include: path.join(mainDir, './sass')
            }
        ]
    },
    plugins: [
        // This plugin will generate the index.html file with a script tag pointing to the dynamic 'bundle.[hash].js'
        // name.
        new HtmlWebpackPlugin({
            template: path.join(mainDir, './html/index.html')
        }),
        // This plugin will output all the transformed CSS into a file called 'main.css'.
        new ExtractTextPlugin('main.css', {
            allChunks: true
        })
    ]
};