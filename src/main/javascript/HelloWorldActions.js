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
import HelloWorldService from './HelloWorldService';

// Here we are defining an asynchronous Redux action by returning a function that takes the Redux "dispatch()" function
// as it's first argument. This will only work if you have added the "redux-thunk" middleware when creating your store.
// You can see this being done in the "app.jsx" file.
// NOTE: Normally you would have multiple actions for any given component.
export const requestHelloWorld = () =>
  // Once the "Hello World" request has returned a 'HELLO_WORLD' action will be dispatched to any registered Redux
  // reducers.
  dispatch => new HelloWorldService().request(data => dispatch({ type: 'HELLO_WORLD', text: data }));

export const loginHelloWorld = (username, password) =>
  (dispatch) => {
    new HelloWorldService().login(
      username, password,
      (responseUsername) => {
        browserHistory.push('/');
        dispatch({ type: 'HELLO_WORLD_LOGIN', username: responseUsername });
      },
      error => dispatch({ type: 'HELLO_WORLD_LOGIN', username: '', loginError: error })
    );
  };
