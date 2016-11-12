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

describe('src/test/javascript/HelloWorldAuthentication.spec.js', () => {

  var registerMock, pushMock, checkForAuthentication, registerFetchAuthInterceptor;

  beforeEach(function () {
    const inject = require('inject!../../main/javascript/HelloWorldAuthentication');
    registerMock = mockFunction();
    pushMock = mockFunction();
    const HelloWorldAuthentication = inject({
      'fetch-intercept': {
        register: registerMock
      },
      'react-router': {
        browserHistory: {
          push: pushMock
        }
      }
    });

    checkForAuthentication = HelloWorldAuthentication.checkForAuthentication;
    registerFetchAuthInterceptor = HelloWorldAuthentication.registerFetchAuthInterceptor;
  });

  function Store() {
  }

  Store.prototype.getState = () => {
  };
  Store.prototype.dispatch = () => {
  };

  function Window() {
  }

  Window.prototype.location = {};

  it('Can redirect to the login page if the user is not logged in', () => {

    const store = mock(Store);
    const nextState = mockFunction();
    const replace = mockFunction();
    const pathname = 'some path';

    // Given
    when(store).getState().thenReturn({ loggedIn: false });
    nextState.location = { pathname: pathname };

    // When
    checkForAuthentication(store)(nextState, replace);

    // Then
    verify(replace)(allOf(
      hasMember('pathname', equalTo('/login')),
      hasMember('state', hasMember('securePage', equalTo(pathname)))
    ));
    verifyZeroInteractions(nextState);
  });

  it('Can continue to the requested page if the user is logged in', () => {

    const store = mock(Store);
    const nextState = mockFunction();
    const replace = mockFunction();

    // Given
    when(store).getState().thenReturn({ loggedIn: true });

    // When
    checkForAuthentication(store)(nextState, replace);

    // Then
    verifyZeroInteractions(nextState, replace);
  });

  it('Can forward to the login page for a forbidden response', () => {

    const store = mock(Store);
    const window = mock(Window);
    var register = null;
    var newState = null;
    const pathname = 'some path';
    const response = {};

    // Given
    when(registerMock)(anything()).then(object => register = object);
    when(store).dispatch(anything()).then((object) => (newState = object.newState()));
    response.status = 403;
    window.location.pathname = pathname;

    // When
    registerFetchAuthInterceptor(store, window);
    register.response(response);

    // Then
    verify(pushMock)(allOf(
      hasMember('pathname', equalTo('/login')),
      hasMember('state', hasMember('securePage', equalTo(pathname)))
    ));
    verify(store).dispatch(allOf(hasMember('type', equalTo('POLYMORPHIC')), hasFunction('newState')));
    assertThat(newState, allOf(hasMember('loggedIn', equalTo(false)), hasMember('username', equalTo(''))));
  });

  it('Will ignore all other response statuses', () => {

    const store = mock(Store);
    const window = mock(Window);
    var register = {};
    const response = {};

    // Given
    when(registerMock)(anything()).then(object => register = object);
    response.status = 200;

    // When
    registerFetchAuthInterceptor(store, window);
    register.response(response);

    // Then
    verifyZeroInteractions(store, window, pushMock);
  });

  it('Calling other unused intercept methods for coverage.', () => {

    var register = {};

    // Given
    when(registerMock)(anything()).then(object => register = object);

    // When
    registerFetchAuthInterceptor();
    register.request();
    register.requestError().catch(() => {
    });
    register.responseError().catch(() => {
    });
  });
});