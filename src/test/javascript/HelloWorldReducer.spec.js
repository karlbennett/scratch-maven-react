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

import HelloWorldReducer from '../../main/javascript/HelloWorldReducers';

describe('src/test/javascript/HelloWorldReducer.spec.js', () => {

  it('Can update the application state with the new hello world text.', () => {

    // Given
    const oldText = 'some old text';
    const newText = 'some new text';
    const oldState = { text: oldText };

    // When
    const actual = HelloWorldReducer(oldState, { type: 'HELLO_WORLD', text: newText });

    // Then
    assertThat(actual, hasMember('text', newText));
    assertThat(oldState, hasMember('text', oldText));
  });

  it('Will not update the application state for a non hello world action.', () => {

    // Given
    const oldText = 'some old text';
    const oldState = { text: oldText };

    // When
    const actual = HelloWorldReducer(oldState, { type: 'HELLO_MOON', text: 'some new text' });

    // Then
    assertThat(actual, hasMember('text', oldText));
    assertThat(oldState, hasMember('text', oldText));
  });
});