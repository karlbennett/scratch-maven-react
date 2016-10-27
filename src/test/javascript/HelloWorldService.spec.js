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

import HelloWorldService from '../../main/javascript/HelloWorldService.js';

// Test Stubs
function Promise() {
}
Promise.prototype.then = function () {
};
function Response() {
}
Response.prototype.text = function () {
};

// Tests
describe('src/test/javascript/HelloWorldService.spec.js', () => {

  it('Can make a request to the endpoint', () => {

    const fetch = mockFunction();
    const data = mockFunction();
    const responsePromise = mock(Promise);
    const response = mock(Response);
    const dataPromise = mock(Promise);
    const text = 'some data';

    // Given
    when(fetch)('/hello').thenReturn(responsePromise);
    when(responsePromise).then(anything()).then((callback) => callback(response));
    when(response).text().thenReturn(dataPromise);
    when(dataPromise).then(anything()).then((callback) => callback(text));

    // When
    new HelloWorldService(fetch).request(data);

    // Then
    verify(data)(text);
  });
});