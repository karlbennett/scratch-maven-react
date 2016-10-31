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
import HelloWorldLogin from '../../main/javascript/HelloWorldLogin';

describe('src/test/javascript/HelloWorldLogin.spec.js', () => {

  it('Can execute a function on submit', () => {

    // Given
    const usernameOnChange = mockFunction();
    const passwordOnChange = mockFunction();
    const submit = mockFunction();

    // When
    mount(
      <HelloWorldLogin usernameOnChange={usernameOnChange} passwordOnChange={passwordOnChange} submitLogin={submit} />
    ).find('form').simulate('submit');

    // Then
    verify(usernameOnChange, never())(anything());
    verify(passwordOnChange, never())(anything());
    verify(submit)(anything());
  });
});