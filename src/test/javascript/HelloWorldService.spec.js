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
import HelloWorldService from '../../main/javascript/HelloWorldService.js';

describe('src/test/javascript/HelloWorldService.spec.js', () => {

  beforeEach(function () {
    fetchMock.restore()
  });

  afterEach(function () {
    fetchMock.restore()
  });

  it('Can make a request to the endpoint', (done) => {

    const data = mockFunction();
    const text = 'some service text';

    // Given
    fetchMock.get('*', text);

    // When
    new HelloWorldService().request(data).then(() => {
      // This is an async action so we must also carry out the verify as an async callback.

      // Then
      verify(data)(text);
      done(); // Indicate that the async test has successfully completed.
    });
  });
});