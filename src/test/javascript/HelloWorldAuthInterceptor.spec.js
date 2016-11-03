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

describe('src/test/javascript/HelloWorldAuthInterceptor.spec.js', () => {

  it('Can forward to the login page for a forbidden response', () => {

    var registerMock = mockFunction();
    var pushMock = mockFunction();
    var register = {};
    var response = {};

    // Given
    when(registerMock)(anything()).then(object => register = object);
    require('inject!../../main/javascript/HelloWorldAuthInterceptor')({
      'fetch-intercept': {
        register: registerMock
      },
      'react-router': {
        browserHistory: {
          push: pushMock
        }
      }
    });
    response.status = 403;

    // When
    register.response(response);

    // Then
    verify(pushMock)('/login');
  });

  it('Will ignore all other response statuses', () => {

    var registerMock = mockFunction();
    var pushMock = mockFunction();
    var register = {};
    var response = {};

    // Given
    when(registerMock)(anything()).then(object => register = object);
    require('inject!../../main/javascript/HelloWorldAuthInterceptor')({
      'fetch-intercept': {
        register: registerMock
      },
      'react-router': {
        browserHistory: {
          push: pushMock
        }
      }
    });
    response.status = 200;

    // When
    register.response(response);

    // Then
    verifyZeroInteractions(pushMock);
  });

  it('Calling other unused intercept methods for coverage.', () => {

    var registerMock = mockFunction();
    var register = {};

    // Given
    when(registerMock)(anything()).then(object => register = object);
    require('inject?fetch-intercept!../../main/javascript/HelloWorldAuthInterceptor')({
      'fetch-intercept': {
        register: registerMock
      }
    });

    // When
    register.request();
    register.requestError().catch(() => {
    });
    register.responseError().catch(() => {
    });
  });
});