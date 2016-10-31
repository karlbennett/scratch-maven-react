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

describe('src/test/javascript/HelloWorldActions.spec.js', () => {

  var mockPush, mockRequest, mockLogin, requestHelloWorld, loginHelloWorld;

  beforeEach(function () {
    // Here we manually load the HelloWorldAction through the inject-loader so that we can override the
    // HelloWorldService import and mock it's request method.
    const inject = require('inject!../../main/javascript/HelloWorldActions');
    mockPush = mockFunction();
    mockRequest = mockFunction();
    mockLogin = mockFunction();
    const HelloWorldActions = inject({
      'react-router': {
        browserHistory: {
          push: mockPush
        }
      },
      './HelloWorldService': class {
        constructor() {
          this.request = mockRequest;
          this.login = mockLogin;
        }
      }
    });

    requestHelloWorld = HelloWorldActions.requestHelloWorld;
    loginHelloWorld = HelloWorldActions.loginHelloWorld;
  });

  it('Can dispatch a HelloWorld request', () => {

    const dispatch = mockFunction();
    const text = 'some text';

    // Given
    when(mockRequest)(anything()).then((callback) => callback(text));

    // When
    requestHelloWorld()(dispatch);

    // Then
    verify(dispatch)(allOf(hasMember('type', equalTo('HELLO_WORLD')), hasMember('text', equalTo(text))));
  });

  it('Can dispatch a successful HelloWorld login', () => {

    const dispatch = mockFunction();
    const username = 'some username';
    const responseUsername = 'some response username';

    // Given
    when(mockLogin)(anything()).then((username, password, success, failure) => success(responseUsername));

    // When
    loginHelloWorld(username, 'some password')(dispatch);

    // Then
    verify(mockPush)('/');
    verify(dispatch)(
      allOf(
        hasMember('type', equalTo('HELLO_WORLD_LOGIN')), hasMember('username', equalTo(responseUsername))
      ));
  });

  it('Can dispatch a successful HelloWorld login', () => {

    const dispatch = mockFunction();
    const username = 'some username';
    const error = 'some response error';

    // Given
    when(mockLogin)(anything()).then((username, password, success, failure) => failure(error));

    // When
    loginHelloWorld(username, 'some password')(dispatch);

    // Then
    verify(mockPush, never())(anything());
    verify(dispatch)(
      allOf(
        hasMember('type', equalTo('HELLO_WORLD_LOGIN')),
        hasMember('username', equalTo('')),
        hasMember('loginError', equalTo(error))
      ));
  });
});