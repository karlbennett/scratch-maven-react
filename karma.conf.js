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

const path = require('path');

// Karma configuration
module.exports = function (config) {
  config.set({

    // Allow console logs to be output during test runs.
    client: {
      captureConsole: true
    },

    // Base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // Frameworks to use
    // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'jsmockito-jshamcrest'],

    // List of files / patterns to load in the browser
    files: [
      // We load the fetch and babel-polyfill scripts on startup becuase some browsers don't support all the ES6
      // functions.
      'node_modules/whatwg-fetch/fetch.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      // Here we give a pattern for finding the actual tests that we wich to load.
      'src/test/javascript/**/*.spec.js'
    ],

    // List of files to exclude
    exclude: [],

    // Compile the ES6 files before the tests are run.
    // Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/test/javascript/**/*.spec.js': ['webpack']
    },

    // The configuration for the karma-webpack plugin.
    // This should be very similar to the main webpack.config.js.
    webpack: {
      node: {
        fs: 'empty'
      },
      resolve: {
        extensions: ['*', '.js', '.jsx']
      },
      module: {
        rules: [
          // ## Pre-loaders
          {
            // This loader will instrument the JavaScript to enable coverage  reporting.
            enforce: 'pre',
            loader: 'isparta-loader',
            test: /\.jsx?$/,
            include: path.join(__dirname, './src/main/javascript')
          },
          // ## Build Loaders
          {
            loader: 'babel-loader',
            test: /\.jsx?$/,
            include: [
              path.join(__dirname, './src/main/javascript'),
              path.join(__dirname, './src/test/javascript')
            ]
          },
          {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
            loader: 'file-loader',
            test: /\.png/
          },
          {
            // This loader is added so that we can handle the JSON file with the 'package.json' file within the cheerio
            // library. Unfortunately we need to compile the cheerio library into our test code to enable the Enzyme
            // test library to work.
            loader: 'json-loader',
            test: /\.json$/
          }
        ]
      },
      // We make sure that Webpack doesn't try to compile the Enzyme code.
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    // Turn off verbose logging of webpack compilation.
    webpackMiddleware: {
      noInfo: true
    },

    // Test results reporter to use
    // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'sonarqubeUnit', 'coverage'],

    // Set the path for the Sonar test report.
    sonarQubeUnitReporter: {
      outputFile: 'target/karma/test/ut_report.xml',
      useBrowserName: false
    },

    // Coverage reports.
    // Available reports: https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md
    coverageReporter: {
      dir: 'target/karma/coverage/',
      reporters: [
        { type: 'text' },
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: 'lcov' },
        { type: 'cobertura', subdir: 'cobertura', file: 'cobertura.xml' }
      ]
    },

    // Web server port
    port: 9876,

    // Enable / disable colors in the output (reporters and logs)
    colors: true,

    // Level of logging
    // Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers
    // Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // If true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
};
