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
import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { render } from 'enzyme';
import HelloWorldLogoutContainer from '../../main/javascript/HelloWorldLogoutContainer';

const mockStore = configureStore([thunk]);

describe('src/test/javascript/HelloWorldLogoutContainer.spec.js', () => {

  beforeEach(function () {
    fetchMock.restore()
  });

  afterEach(function () {
    fetchMock.restore()
  });

  it('Can logout successfully', () => {

    // Given
    const store = mockStore({});
    fetchMock.post('*', { status: 200 });

    // When
    render(<HelloWorldLogoutContainer store={store} />);
  });
});