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

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';
import HelloWorldReducer from './HelloWorldReducer';
import HelloWorldContainer from './HelloWorldContainer';

// This will cause Webpack to add the compiled "main.scss" SASS file to the index.html page.
require('../sass/main.scss');

// Here we create the Redux store and add the "redux-thunk" middleware that allows us to make asynchronous dispatches.
const store = createStore(HelloWorldReducer, applyMiddleware(thunk));

// Here we setup the entire React app. First the "Provider" component is used to automatically add the Redux store to
// all React components. Then the "Router" is used to setup the supported paths to the main component
// e.g. "/" and "/helloWorld"
window.app = ReactDOM.render( // eslint-disable-line no-undef
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HelloWorldContainer}>
        <Route path="helloWorld" component={HelloWorldContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content') // eslint-disable-line no-undef
);
