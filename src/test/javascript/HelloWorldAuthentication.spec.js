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

  it('Can redirect to the login page if the user is not logged in', () => {

    var store = mock(Store);
    var nextState = mockFunction();
    var replace = mockFunction();

    // Given
    when(store).getState().thenReturn({ loggedIn: false });

    // When
    checkForAuthentication(store)(nextState, replace);

    // Then
    verify(replace)('/login');
    verifyZeroInteractions(nextState);
  });

  it('Can continue to the requested page if the user is logged in', () => {

    var store = mock(Store);
    var nextState = mockFunction();
    var replace = mockFunction();

    // Given
    when(store).getState().thenReturn({ loggedIn: true });

    // When
    checkForAuthentication(store)(nextState, replace);

    // Then
    verifyZeroInteractions(nextState, replace);
  });

  it('Can forward to the login page for a forbidden response', () => {

    var register = {};
    var response = {};

    // Given
    when(registerMock)(anything()).then(object => register = object);
    response.status = 403;

    // When
    registerFetchAuthInterceptor();
    register.response(response);

    // Then
    verify(pushMock)('/login');
  });

  it('Will ignore all other response statuses', () => {

    var register = {};
    var response = {};

    // Given
    when(registerMock)(anything()).then(object => register = object);
    response.status = 200;

    // When
    registerFetchAuthInterceptor();
    register.response(response);

    // Then
    verifyZeroInteractions(pushMock);
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