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

// We have exposed the three event callback functions in this component to allow other components of containers the
// register their own functions that can then update their state from the interactions with this components inputs.
const HelloWorldLogin = ({ usernameOnChange, passwordOnChange, submitLogin }) => (
  <div className="hello_world_login">
    <form action="/login" method="POST" onSubmit={submitLogin}>
      <label htmlFor="username" className="hello_world_login_username_label">Username</label>
      <input
        id="username" name="username" type="text" className="hello_world_login_username"
        onChange={usernameOnChange}
      />
      <label htmlFor="password" className="hello_world_login_password_label">Password</label>
      <input
        id="password" name="password" type="password" className="hello_world_login_password"
        onChange={passwordOnChange}
      />
      <button type="submit" className="hello_world_login_button">Login</button>
    </form>
  </div>
);

HelloWorldLogin.propTypes = {
  usernameOnChange: PropTypes.func.isRequired,
  passwordOnChange: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
};

export default HelloWorldLogin;
