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

// This is the service that makes the "Hello World" HTTP request. It is completely decouple from any React or Redux
// code, this makes it much simpler to unit test.
export default class HelloWorldService {
  constructor(fetch) {
    this.fetch = fetch;
  }

  // Make the HTTP request and pass the response body down into the supplied callback.
  request(processData) {
    this.fetch('/hello').then(response => response.text()).then(text => processData(text));
  }
}
