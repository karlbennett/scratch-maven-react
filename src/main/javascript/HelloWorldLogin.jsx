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

import React, { Component, PropTypes } from 'react';

class HelloWorldLogin extends Component {

  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this); // Must bind 'this' to put it into the methods scope.
    this.state = {
      username: '',
      password: ''
    }
  }

  submitLogin(event) {
    event.preventDefault();
    this.props.submitLogin(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="hello_world_login">
        <form action="/login" method="POST" onSubmit={this.submitLogin}>
          <label htmlFor="username" className="hello_world_login_username_label">Username</label>
          <input
            id="username" name="username" type="text" className="hello_world_login_username"
            value={this.state.username}
          />
          <label htmlFor="password" className="hello_world_login_password_label">Password</label>
          <input
            id="password" name="password" type="password" className="hello_world_login_password"
            value={this.state.password}
          />
          <button type="submit" className="hello_world_login_button">Login</button>
        </form>
      </div>
    );
  }
}

HelloWorldLogin.propTypes = {
  submitLogin: PropTypes.func.isRequired,
};

export default HelloWorldLogin;
