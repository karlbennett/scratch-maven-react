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

import fetchIntercept from 'fetch-intercept';
import { browserHistory } from 'react-router';

/**
 * This function should be used to add an 'onEnter' callback to any react-router 'Route' to a secure page. The callback
 * will then used the supplied Redux store to check if the user is logged in or not. If they aren't it will redirect
 * them to the '/login' page.
 *
 * Usage: <Route path="securePath" component={SecureContainer} onEnter={checkForAuthentication(store)} />
 */
export const checkForAuthentication = store => (nextState, replace) => {
  if (!store.getState().loggedIn) {
    replace('/login');
  }
};

/**
 * Here we ar registering a 'fetch' interceptor that will redirect the user to the login page whenever a fetch request
 * responds with forbidden which is an indication that the user is not logged in to the backend. It is this interceptor
 * that will log the user out in the frontend if their session has timed out in the backend.
 */
export const registerFetchAuthInterceptor = () =>
  fetchIntercept.register({
    // Have to create these stubs or the library will crash.
    request: (url, config) => [url, config],
    requestError: error => Promise.reject(error),
    responseError: error => Promise.reject(error),

    response: (response) => {
      if (response.status === 403) {
        browserHistory.push('/login');
      }
      return response;
    },
  });
