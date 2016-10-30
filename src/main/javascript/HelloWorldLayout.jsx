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

/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router';

const HelloWorldLayout = ({ children }) => (
  <div>
    <div className="hello_world_header">
      <Link className="hello_world_login" to={'/login'}>Login</Link>
    </div>
    <div className="hello_world_content">
      {children}
    </div>
  </div>
);

export default HelloWorldLayout;