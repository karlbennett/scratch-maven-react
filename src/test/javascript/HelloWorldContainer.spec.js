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

import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { render } from 'enzyme';
import HelloWorldContainer from '../../main/javascript/HelloWorldContainer';

// Here we configure a function that can be used to create a mock Redux store that also has 'redux-thunk' support.
const mockStore = configureStore([thunk]);

describe('src/test/javascript/HelloWorldContainer.spec.js', () => {

  it('Can add text to a HelloWorldContainer tag', () => {

    // Given
    const text = 'some text';
    const store = mockStore({ text }); // Create the mock store with an initial state that contains the test data.

    // When
    const actual = render(<HelloWorldContainer store={store} text={text} />).find('a').text();

    // Then
    assertThat(actual, equalTo(text))
  });
});