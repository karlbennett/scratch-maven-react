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

// Here we are defining the "Hello World" reducer, it is responsible for taking the "text" field from it's supplied
// "action" and producing a new Redux "state" that contains that new "text" field. Doing this will cause Redux to
// re-render any registered React components that are bound to the states "text" field. You can see one of these
// bindings in "HelloWorldContainer.jsx".
// NOTE: Normally you would have multiple reducers for any given component.
export default (state = {}, action) => {
  // Only modify the state if the current Redux action is a 'HELLO_WORLD' action.
  if (action.type === 'HELLO_WORLD') {
    return Object.assign({}, state, { text: action.text });
  }
  return state;
};
