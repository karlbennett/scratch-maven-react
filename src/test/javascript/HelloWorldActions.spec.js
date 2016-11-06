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

  var mockPush, mockRequest, mockRequestSecret, mockLogin, mockLogout, loginHelloWorld, logoutHelloWorld,
    requestHelloWorld, requestHelloWorldSecret;

  beforeEach(function () {
    // Here we manually load the HelloWorldAction through the inject-loader so that we can override the
    // HelloWorldService import and mock it's request method.
    const inject = require('inject!../../main/javascript/HelloWorldActions');
    mockPush = mockFunction();
    mockRequest = mockFunction();
    mockRequestSecret = mockFunction();
    mockLogin = mockFunction();
    mockLogout = mockFunction();
    const HelloWorldActions = inject({
      'react-router': {
        browserHistory: {
          push: mockPush
        }
      },
      './HelloWorldService': {
        request: mockRequest,
        requestSecret: mockRequestSecret,
        login: mockLogin,
        logout: mockLogout
      }
    });

    loginHelloWorld = HelloWorldActions.loginHelloWorld;
    logoutHelloWorld = HelloWorldActions.logoutHelloWorld;
    requestHelloWorld = HelloWorldActions.requestHelloWorld;
    requestHelloWorldSecret = HelloWorldActions.requestHelloWorldSecret;
  });

  it('Can dispatch a successful HelloWorld request', () => {

    const dispatch = mockFunction();
    const text = 'some text';
    var newState = null;

    // Given
    when(mockRequest)(anything()).then(success => success(text));
    when(dispatch)(anything()).then((object) => (newState = object.newState()));

    // When
    requestHelloWorld()(dispatch);

    // Then
    verify(dispatch)(allOf(hasMember('type', equalTo('POLYMORPHIC')), hasFunction('newState')));
    assertThat(newState, hasMember('text', equalTo(text)));
  });

  it('Can dispatch a failed HelloWorld request', () => {

    const dispatch = mockFunction();
    const text = 'some text';
    var newState = null;

    // Given
    when(mockRequest)(anything()).then((success, failure) => failure());
    when(dispatch)(anything()).then((object) => (newState = object.newState()));

    // When
    requestHelloWorld()(dispatch);

    // Then
    verify(dispatch)(allOf(hasMember('type', equalTo('POLYMORPHIC')), hasFunction('newState')));
    assertThat(newState, hasMember('text', equalTo('')));
  });

  it('Can dispatch a successful HelloWorld secret request', () => {

    const dispatch = mockFunction();
    const text = 'some text';
    var newState = null;

    // Given
    when(mockRequestSecret)(anything()).then(success => success(text));
    when(dispatch)(anything()).then((object) => (newState = object.newState()));

    // When
    requestHelloWorldSecret()(dispatch);

    // Then
    verify(dispatch)(allOf(hasMember('type', equalTo('POLYMORPHIC')), hasFunction('newState')));
    assertThat(newState, hasMember('secretText', equalTo(text)));
  });

  it('Can dispatch a failed HelloWorld secret request', () => {

    const dispatch = mockFunction();
    const text = 'some text';
    var newState = null;

    // Given
    when(mockRequestSecret)(anything()).then((success, failure) => failure());
    when(dispatch)(anything()).then((object) => (newState = object.newState()));

    // When
    requestHelloWorldSecret()(dispatch);

    // Then
    verify(dispatch)(allOf(hasMember('type', equalTo('POLYMORPHIC')), hasFunction('newState')));
    assertThat(newState, hasMember('secretText', equalTo('')));
  });

  it('Can dispatch a successful HelloWorld login', () => {

    const dispatch = mockFunction();
    const username = 'some username';
    const responseUsername = 'some response username';
    var newState = null;

    // Given
    when(mockLogin)(anything()).then((username, password, success, failure) => success(responseUsername));
    when(dispatch)(anything()).then((object) => (newState = object.newState()));

    // When
    loginHelloWorld(username, 'some password')(dispatch);

    // Then
    verify(mockPush)('/');
    verify(dispatch)(allOf(hasMember('type', equalTo('POLYMORPHIC')), hasFunction('newState')));
    assertThat(
      newState,
      allOf(
        hasMember('loggedIn', equalTo(true)),
        hasMember('username', equalTo(responseUsername))
      )
    );
  });

  it('Can dispatch a failed HelloWorld login', () => {

    const dispatch = mockFunction();
    const username = 'some username';
    const error = 'some response error';
    var newState = null;

    // Given
    when(mockLogin)(anything()).then((username, password, success, failure) => failure(error));
    when(dispatch)(anything()).then((object) => (newState = object.newState()));

    // When
    loginHelloWorld(username, 'some password')(dispatch);

    // Then
    verify(mockPush, never())(anything());
    verify(dispatch)(allOf(hasMember('type', equalTo('POLYMORPHIC')), hasFunction('newState')));
    assertThat(
      newState,
      allOf(
        hasMember('loggedIn', equalTo(false)),
        hasMember('username', equalTo('')),
        hasMember('loginError', equalTo(error))
      )
    );
  });

  it('Can dispatch a successful HelloWorld logout', () => {

    const dispatch = mockFunction();
    var newState = null;

    // Given
    when(mockLogout)(anything()).then((callBack) => callBack());
    when(dispatch)(anything()).then((object) => (newState = object.newState()));

    // When
    logoutHelloWorld()(dispatch);

    // Then
    verify(mockPush)('/');
    verify(dispatch)(allOf(hasMember('type', equalTo('POLYMORPHIC')), hasFunction('newState')));
    assertThat(
      newState,
      allOf(
        hasMember('loggedIn', equalTo(false)),
        hasMember('username', equalTo(''))
      )
    );
  });
});