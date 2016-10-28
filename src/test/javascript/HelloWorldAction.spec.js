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

describe('src/test/javascript/HelloWorldAction.spec.js', () => {

  var mockRequest, HelloWorldAction;

  beforeEach(function () {
    // Here we manually load the HelloWorldAction through the inject-loader so that we can override the
    // HelloWorldService import and mock it's request method.
    const inject = require('inject!../../main/javascript/HelloWorldAction');
    mockRequest = mockFunction();
    HelloWorldAction = inject({
      './HelloWorldService': class {
        constructor() {
          this.request = mockRequest;
        }
      }
    }).default;
  });

  it('Can dispatch a HelloWorld action', () => {

    const dispatch = mockFunction();
    const text = 'some text';

    // Given
    when(mockRequest)(anything()).then((callback) => callback(text));

    // When
    HelloWorldAction()(dispatch);

    // Then
    verify(dispatch)(allOf(hasMember('type', equalTo('HELLO_WORLD')), hasMember('text', equalTo(text))));
  });
});