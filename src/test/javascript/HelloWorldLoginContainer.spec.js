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

  function setText(input, text) {
    input.get(0).value = text;
    input.simulate('change');
  }

  let mockLoginHelloWorld, HelloWorldLoginContainer;

  beforeEach(function () {
    const inject = require('inject-loader?./HelloWorldActions!../../main/javascript/HelloWorldLoginContainer');
    mockLoginHelloWorld = mockFunction();
    HelloWorldLoginContainer = inject({
      './HelloWorldActions': {
        loginHelloWorld: mockLoginHelloWorld
      }
    }).default;
  });

  it('Can execute a function on submit', () => {

    const store = mockStore({});
    const username = 'some username';
    const password = 'some password';
    const location = {};
    const securePage = 'some page';

    // Given
    when(mockLoginHelloWorld)(anything()).thenReturn({ type: 'MOCK_ACTION' });
    location.state = { securePage };

    // When
    const container = mount(<HelloWorldLoginContainer store={store} location={location} />);
    setText(container.find('#username'), username);
    setText(container.find('#password'), password);
    container.find('form').simulate('submit');

    // Then
    verify(mockLoginHelloWorld)(username, password, securePage);
  });

  it('Can redirect to the home page if no secure page was requested', () => {

    const store = mockStore({});
    const username = 'some username';
    const password = 'some password';
    const location = {};

    // Given
    when(mockLoginHelloWorld)(anything()).thenReturn({ type: 'MOCK_ACTION' });

    // When
    const container = mount(<HelloWorldLoginContainer store={store} location={location} />);
    setText(container.find('#username'), username);
    setText(container.find('#password'), password);
    container.find('form').simulate('submit');

    // Then
    verify(mockLoginHelloWorld)(username, password, '/');
  });
});