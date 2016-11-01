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

// Here we are defining the "Hello World" reducer, it is responsible for reacting to any actions that have been
// dispatched and updating the application state accordingly. If the reducer ends up changing the state then Redux will
// re-render any components that have bound to that state attributes that have been updated.
export default (state = {}, action) => {
  // A polymorphic action must contain a 'newState' function that will return the required state updates when it is
  // evaluated.
  if (action.type === 'POLYMORPHIC') {
    return Object.assign({}, state, action.newState(state));
  }
  return state;
};
