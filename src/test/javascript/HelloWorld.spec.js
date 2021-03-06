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
import { shallow } from 'enzyme';
import HelloWorld from '../../main/javascript/HelloWorld';

describe('src/test/javascript/HelloWorld.spec.js', () => {

  it('Can add text to a HelloWorld tag', () => {

    // Given
    const text = 'some text';

    // When
    const actual = shallow(<HelloWorld text={text} linkUrl="" linkText="" imageClassNames="" />)
      .find('.hello_world_message').text();

    // Then
    assertThat(actual, equalTo(text))
  });
});