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

import { REHYDRATE } from 'redux-persist/constants';
import HelloWorldReducer from '../../main/javascript/HelloWorldReducer';

describe('src/test/javascript/HelloWorldReducer.spec.js', () => {

  it('Can start the application with default state', () => {

    // When
    const actual = HelloWorldReducer(undefined, { type: 'invalid' });

    // Then
    assertThat(actual, hasMember('text', ''));
  });

  it('Can update the application state with a polymorphic action', () => {

    // Given
    const oldText = 'some old text';
    const newText = 'some new text';
    const oldState = { text: oldText };

    // When
    const actual = HelloWorldReducer(oldState, { type: 'POLYMORPHIC', newState: () => ({ text: newText }) });

    // Then
    assertThat(actual, hasMember('text', newText));
    assertThat(oldState, hasMember('text', oldText));
  });

  it('Can hydrate the application state with a react-persist REHYDRATE action', () => {

    // Given
    const oldText = 'some old text';
    const newText = 'some new text';
    const oldState = { text: oldText };

    // When
    const actual = HelloWorldReducer(oldState, { type: REHYDRATE, payload: { text: newText } });

    // Then
    assertThat(actual, hasMember('text', newText));
    assertThat(oldState, hasMember('text', oldText));
  });
});