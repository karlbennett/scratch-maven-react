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

import fetchMock from 'fetch-mock';
import { login, logout, request, requestSecret } from '../../main/javascript/HelloWorldService.js';

describe('src/test/javascript/HelloWorldService.spec.js', () => {

  beforeEach(function () {
    fetchMock.restore()
  });

  afterEach(function () {
    fetchMock.restore()
  });

  it('Can make a hello world request', (done) => {

    const success = mockFunction();
    const text = 'some service text';

    // Given
    fetchMock.get('*', text);

    // When
    request(success).then(() => {
      // This is an async action so we must also carry out the verify as an async callback.

      // Then
      verify(success)(text);
      done(); // Indicate that the async test has successfully completed.
    });
  });

  it('Can fail to make a hello world request', (done) => {

    const failure = mockFunction();
    const error = 'some service error text';

    // Given
    fetchMock.get('*', { status: 400, body: error });

    // When
    request(undefined, failure).then(() => {

      // Then
      verify(failure)(allOf(
        hasMember('status', 400),
        hasMember('body', error),
        hasMember('errorMessage', 'Hello World request failed.')
      ));
      done();
    });
  });

  it('Can make a secret hello world request', (done) => {

    const data = mockFunction();
    const text = 'some secret service text';

    // Given
    fetchMock.get('*', text);

    // When
    requestSecret(data).then(() => {

      // Then
      verify(data)(text);
      done();
    });
  });

  it('Can fail to make a secret hello world request', (done) => {

    const failure = mockFunction();
    const error = 'some secret service error text';

    // Given
    fetchMock.get('*', { status: 400, body: error });

    // When
    requestSecret(undefined, failure).then(() => {

      // Then
      verify(failure)(allOf(
        hasMember('status', 400),
        hasMember('body', error),
        hasMember('errorMessage', 'Hello World secret request failed.')
      ));
      done();
    });
  });

  it('Can make a successful login request', (done) => {

    const username = 'some service username';
    const password = 'some service password';
    const responseUsername = 'some service username';
    const success = mockFunction();
    const failure = mockFunction();

    // Given
    fetchMock.post('*', { status: 200, body: { username: responseUsername } });

    // When
    login(username, password, success, failure).then(() => {

      // Then
      verify(success)(responseUsername);
      verify(failure, never())(anything());
      done();
    });
  });

  it('Can make a failed login request', (done) => {

    const username = 'some service username';
    const password = 'some service password';
    const success = mockFunction();
    const failure = mockFunction();

    // Given
    fetchMock.post('*', { status: 401 });

    // When
    login(username, password, success, failure).then(() => {

      // Then
      verify(success, never())(anything());
      verify(failure)('Login Failed');
      done();
    });
  });

  it('Can make a successful logout request', (done) => {

    const callback = mockFunction();

    // Given
    fetchMock.post('*', { status: 200 });

    // When
    logout(callback).then(() => {

      // Then
      verify(callback)();
      done();
    });
  });
});