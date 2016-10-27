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

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Here we create a JSX fragment that can be used within other React components as a tag e.g. <HelloWorld/>
const HelloWorld = ({ text }) => (
  <div className="hello_world">
    <p><Link to={'/helloWorld'}>{text}</Link></p>
    <div className="hello_world_image" />
  </div>
);

// Here we define any properties for the fragment, these map to attributes within the tag
// e.g. <HelloWorld text={'some text'}/>
HelloWorld.propTypes = {
  text: PropTypes.string,
};

export default HelloWorld;
