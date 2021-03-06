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
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import { persistStore } from 'redux-persist';
import HelloWorldReducer from './HelloWorldReducer';
import HelloWorldLayout from './HelloWorldLayout';
import { checkForAuthentication, registerFetchAuthInterceptor } from './HelloWorldAuthentication';
import HelloWorldContainer from './HelloWorldContainer';
import HelloWorldSecretContainer from './HelloWorldSecretContainer';
import HelloWorldLoginContainer from './HelloWorldLoginContainer';
import HelloWorldLogoutContainer from './HelloWorldLogoutContainer';
import HelloWorldNoFound from './HelloWorldNoFound';

// This will cause Webpack to add the compiled "main.scss" SASS file to the index.html page.
require('../sass/main.scss');

// Here we create the Redux store.
// The "redux-thunk" middleware is added to allows us to make asynchronous dispatches.
// The the "autoRehydrate" enhancer is added so the 'redux-persist' hydrates the Redux store with the last state after a
// browser refresh.
const store = createStore(HelloWorldReducer, undefined, applyMiddleware(thunk));

// Start persisting the Redux state to local storage.
persistStore(store, {}, () => {
  // We render the application in this callback to make sure that it is rendered after the Redux store has been
  // rehydrated.

  // This will register the authentication 'fetch' interceptors.
  registerFetchAuthInterceptor(store, window); // eslint-disable-line no-undef

  // Here we setup the entire React app. First the "Provider" component is used to automatically add the Redux store to
  // all React components. Then the "Router" is used to setup the supported paths to the main components
  // e.g. "/", "/helloSecret", "/login", "/logout"
  window.app = ReactDOM.render( // eslint-disable-line no-undef
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={HelloWorldLayout}>
          <IndexRoute component={HelloWorldContainer} />
          <Route path="login" component={HelloWorldLoginContainer} />
          <Route path="logout" component={HelloWorldLogoutContainer} />
          <Route path="helloSecret" component={HelloWorldSecretContainer} onEnter={checkForAuthentication(store)} />
          <Route path="*" component={HelloWorldNoFound} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('content') // eslint-disable-line no-undef
  );
});
