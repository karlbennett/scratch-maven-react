const applyProfile = require('webpack-profiles');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const mainDir = path.join(__dirname, './src/main');
const srcDir = path.join(mainDir, './javascript');
const outputDir = path.join(__dirname, './target/dist');

const webpack = {
  // This is the path to the core JavaScript file that will initialise the entire application.
  entry: path.join(srcDir, './app.jsx'),
  output: {
    // Webpack will build the code into this directory.
    path: outputDir
  },

  // These are the file extensions that will assumed for import names
  // e.g. import HelloWorld from './HelloWorld';
  // Will be assumed to have either the extension '.js' or '.jsx'.
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    preLoaders: [
      {
        // This is the ESLint Webpack loader. It will check the ES6 code for any code style errors.
        loader: 'eslint-loader',
        // We will check all the JavaScript files.
        test: /\.jsx?$/,
        include: srcDir
      }
    ],
    loaders: [
      {
        // This is the ES6 Webpack loader. It will pre-process any ES6 files.
        loader: 'babel-loader',
        // We assume that all the JavaScript files contain ES6 code.
        test: /\.jsx?$/,
        // We also assume all the source files reside in the below directory.
        include: srcDir,
        exclude: /spec\.js$/
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

module.exports = applyProfile(webpack, { profilesFilename: 'webpack.profiles.js' });