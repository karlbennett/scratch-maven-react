/*
 * Copyright 2016 Karl Bennett
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    path: outputDir,
    publicPath: '/'
  },

  // These are the file extensions that will be assumed for import names
  // e.g. import HelloWorld from './HelloWorld';
  // Will be assumed to have either the extension '.js' or '.jsx'.
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  module: {
    rules: [
      // ## Pre-loaders
      {
        enforce: 'pre',
        // This is the ESLint Webpack loader. It will check the ES6 code for any code style errors.
        loader: 'eslint-loader',
        // We will check all the JavaScript files.
        test: /\.jsx?$/
      },
      // ## Build Loaders
      {
        // This is the ES6 Webpack loader. It will pre-process any ES6 files.
        loader: 'babel-loader',
        // We assume that all the JavaScript files contain ES6 code.
        test: /\.jsx?$/,
        exclude: /spec\.js$/
      },
      {
        // This is the file loader. It is used to copy the images into the final build location. The build image paths
        // produces by this loader will then be used by the 'css' and 'sass' loaders below to set the correct values in
        // the 'url()' function calls.
        loader: 'file-loader',
        test: /\.png/,
        query: {
          // Note the '/' at the start of the name. This is needed to stop the image urls from being relative.
          name: 'images/[name].[ext]'
        }
      },
      {
        // This is the SASS loader. It will compile the SASS files. We have used the
        // 'extract-text-webpack-plugin' loader so that the CSS is compiled into an external file instead of
        // placed inline within the index.html.
        loader: ExtractTextPlugin.extract(['css', 'sass']),
        // We assume that all the SASS files end with '.scss'.
        test: /\.scss$/
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
    new ExtractTextPlugin({
      filename: 'styles/main.css',
      allChunks: true
    })
  ]
};

// It is not possible to use custom arguments in Webpack 2 so the "--profiles" webpack-profiles argument will no longer
// work. We can get around this by using the Webpack 2 "env" argument e.g. webpack --env.profiles=prod
module.exports = function (env) {
  return applyProfile(webpack, { profilesFilename: 'webpack.profiles.js', profiles: env === undefined ? '' : env.profiles});
}