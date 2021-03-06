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

/**
 * This fragment will be displayed for any path that doesn't have an explicit react-router mapping.
 */
const HelloWorldNotFound = () => (
  <div className="hello_world_not_found">
    <h3 className="hello_world_not_found_message">Page not found.</h3>
  </div>
);

export default HelloWorldNotFound;
