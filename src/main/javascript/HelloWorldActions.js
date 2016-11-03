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

import { browserHistory } from 'react-router';
import { login, request, requestSecret } from './HelloWorldService';

/**
 * If the login succeeds forward to the home page and dispatch the state for a successful login.
 */
function loginSuccessHandler(dispatch) {
  return (responseUsername) => {
    browserHistory.push('/');
    dispatch({ type: 'POLYMORPHIC', newState: () => ({ loggedIn: true, username: responseUsername }) });
  };
}

/**
 * If the login fails make sure to clear the login state.
 */
function loginFailureHandler(dispatch) {
  return error => dispatch({
    type: 'POLYMORPHIC',
    newState: () => ({ loggedIn: false, username: '', loginError: error }),
  });
}

/**
 * Here we are defining an asynchronous Redux action by returning a function that takes the Redux "dispatch()" function
 * as it's first argument. Redux will only support this type of action if you have added the "redux-thunk" middleware
 * when creating your store. You can see this being done in the "app.jsx" file.
 */
export const requestHelloWorld = () =>
  // Once the 'Hello World' request has returned, a 'HELLO_WORLD' action will be dispatched to any registered Redux
  // reducers.
  dispatch => request(data => dispatch({ type: 'POLYMORPHIC', newState: () => ({ text: data }) }));

/**
 * This action carries out an asynchronous HTTP request for the secured 'Hello World' text..
 */
export const requestHelloWorldSecret = () =>
  dispatch => requestSecret(data => dispatch({ type: 'POLYMORPHIC', newState: () => ({ secretText: data }) }));

/**
 * This action carries out a login, it is also asynchronous because the login is an HTTP request.
 */
export const loginHelloWorld = (username, password) =>
  dispatch => login(username, password, loginSuccessHandler(dispatch), loginFailureHandler(dispatch));
