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
import { render } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import HelloWorldLayout from '../../main/javascript/HelloWorldLayout';

const mockStore = configureStore([thunk]);

describe('src/test/javascript/HelloWorldLayout.spec.js', () => {

  it('Can show that the user is not logged in', () => {

    // Given
    const store = mockStore({});

    // When
    const actual = render(<HelloWorldLayout store={store} />).find('.hello_world_header > a').text();

    // Then
    assertThat(actual, equalTo('Login'))
  });

  it('Can show that the user is logged in', () => {

    // Given
    const username = 'some username';
    const store = mockStore({ loggedIn: true, username });

    // When
    const component = render(<HelloWorldLayout store={store} />);

    // Then
    assertThat(component.find('.hello_world_header p').text(), equalTo(username));
    assertThat(component.find('.hello_world_header a').text(), equalTo('Logout'));
  });

  it('Can add content to the layout', () => {

    // Given
    const store = mockStore({});
    const expected = 'some content';

    // When
    const actual = render(<HelloWorldLayout store={store}>{expected}</HelloWorldLayout>)
      .find('.hello_world_content').text();

    // Then
    assertThat(actual, equalTo(expected))
  });
});