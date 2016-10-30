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
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([thunk]);

describe('src/test/javascript/HelloWorldLoginContainer.spec.js', () => {

  var mockLoginHelloWorld, HelloWorldLoginContainer;

  beforeEach(function () {
    const inject = require('inject?./HelloWorldActions!../../main/javascript/HelloWorldLoginContainer');
    mockLoginHelloWorld = mockFunction();
    HelloWorldLoginContainer = inject({
      './HelloWorldActions': {
        loginHelloWorld: mockLoginHelloWorld
      }
    }).default;
  });

  it('Can execute a function on submit', () => {

    const store = mockStore({});

    // Given
    when(mockLoginHelloWorld)('', '').thenReturn({ type: 'MOCK_ACTION' });

    // When
    mount(<HelloWorldLoginContainer store={store} />).find('form').simulate('submit');

    // Then
    verify(mockLoginHelloWorld)('', '');
  });
});