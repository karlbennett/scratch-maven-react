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
import { connect } from 'react-redux';
import _ from 'lodash';
import { loginHelloWorld } from './HelloWorldActions';

class HelloWorldLoginContainer extends Component {

  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
    this.usernameOnChange = this.usernameOnChange.bind(this);
    this.passwordOnChange = this.passwordOnChange.bind(this);
    this.state = {
      username: '',
      password: '',
    };
  }

  /**
   * This method carries out the login request, it does this by first stopping the submit from doing it's normal page
   * POST so we don't get taken away from the current page. Then is records and clears the login state so that it isn't
   * recorded and presented the next time this component is rendered. Lastly it carries out the actual login HTTP
   * request with the entered username, password, and the page we may have been redirected away from by calling the
   * bound Redux action.
   */
  submitLogin(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.setState({ username: '', password: '' });
    // eslint-disable-next-line react/prop-types
    this.props.submitLogin(username, password, _.get(this.props.location, 'state.securePage', '/'));
  }

  /**
   * This even callback is called every time a character is entered into the Username input. This makes sure this
   * components state is in sync with the inputs states.
   */
  usernameOnChange(event) {
    this.setState({ username: event.target.value });
  }

  /**
   * This even callback is called every time a character is entered into the Password input. This makes sure this
   * components state is in sync with the inputs states.
   */
  passwordOnChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    // We haven't bothered pulling this template out as a separate component because it will only ever be used within
    // the page produced by this container. If later there was a need for a generic login form then it could be pulled
    // out then.
    return (
      <div className="hello_world_login">
        <form action="/login" method="POST" onSubmit={this.submitLogin}>
          <div className="hello_world_login_username">
            <label htmlFor="username" className="hello_world_login_username_label">Username</label>
            {/*
             We don't bind the components state to the input values so that when we clear the state on a submit it
             doesn't clear the inputs which would then be seen by the user.
             */}
            <input
              id="username" name="username" type="text" className="hello_world_login_username_input"
              onChange={this.usernameOnChange}
            />
          </div>
          <div className="hello_world_login_password">
            <label htmlFor="password" className="hello_world_login_password_label">Password</label>
            <input
              id="password" name="password" type="password" className="hello_world_login_password_input"
              onChange={this.passwordOnChange}
            />
          </div>
          <button type="submit" className="hello_world_login_button">Login</button>
        </form>
      </div>
    );
  }
}

HelloWorldLoginContainer.propTypes = {
  submitLogin: PropTypes.func,
};

// We have no properties to bind to Redux just the loginHelloWorld action. This is because the login username and
// password don't need to be available to anyu other components.
export default connect(() => ({}), { submitLogin: loginHelloWorld })(HelloWorldLoginContainer);
