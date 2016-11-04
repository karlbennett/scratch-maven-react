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

// We MUST import the fetch function like this for the fetch-mock to work in the tests.
import 'isomorphic-fetch';

// These are the service functions that make the 'Hello World' HTTP requests. They are completely decouple from any
// React or Redux code, this makes them much simpler to unit test.

/**
 * Request the 'Hello World' message and then pass it down into the supplied 'processData' callback.
 */
export const request = processData =>
  // We return the promise that results from the async requests to allow users of this method to add further executions
  // to the chain.
  // eslint-disable-next-line no-undef
  fetch('/hello').then(response => response.text()).then(text => processData(text));

/**
 * Request the secured 'Hello World' message and then pass it down into the supplied 'processData' callback.
 */
export const requestSecret = processData =>
  // We have to add the '{ credentials: 'same-origin' }' configuration to the 'fetch' call to make it send the browser
  // cookies for the current domain. Without this the HTTP call would not be authenticated.
  // eslint-disable-next-line no-undef
  fetch('/secret', { credentials: 'same-origin' }).then(response => response.text()).then(text => processData(text));

/**
 * Make the login request using the supplied username and password, if it succeeds call the 'success' callback
 * otherwise call the 'failure' callback.
 */
export const login = (username, password, success, failure) =>
  // eslint-disable-next-line no-undef
  fetch(
    '/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: `username=${username}&password=${password}`,
      credentials: 'same-origin',
    }
  ).then((response) => {
    if (!response.ok) { // Fetch doesn't call failure functions for HTTP error codes like other clients.
      throw Error('Login Failed');
    }
    return response.json();
  }).then(json => success(json.username))
    .catch(error => failure(error.message));

/**
 * Logout then call the supplied callback.
 */
export const logout = callback =>
  // eslint-disable-next-line no-undef
  fetch('/logout', { method: 'POST', credentials: 'same-origin' }).then(() => callback());
