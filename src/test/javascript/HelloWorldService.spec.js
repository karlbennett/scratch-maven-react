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
import { request, login } from '../../main/javascript/HelloWorldService.js';

describe('src/test/javascript/HelloWorldService.spec.js', () => {

  beforeEach(function () {
    fetchMock.restore()
  });

  afterEach(function () {
    fetchMock.restore()
  });

  it('Can make a hello world request', (done) => {

    const data = mockFunction();
    const text = 'some service text';

    // Given
    fetchMock.get('*', text);

    // When
    request(data).then(() => {
      // This is an async action so we must also carry out the verify as an async callback.

      // Then
      verify(data)(text);
      done(); // Indicate that the async test has successfully completed.
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
});