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
import { loginHelloWorld } from './HelloWorldActions';
import HelloWorldLogin from './HelloWorldLogin';

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
   * POST we don't get taken away from the current page. Then is records and clears the login state so that it isn't
   * recorded and presented the next time this component is rendered. Lastly it carries out the actual login HTTP
   * request with the entered username and password by calling the bound Redux action.
   */
  submitLogin(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.setState({ username: '', password: '' });
    this.props.submitLogin(username, password);
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
    return (
      <HelloWorldLogin
        usernameOnChange={this.usernameOnChange} passwordOnChange={this.passwordOnChange} submitLogin={this.submitLogin}
      />
    );
  }
}

HelloWorldLoginContainer.propTypes = {
  submitLogin: PropTypes.func,
};

// We have no properties to bind to Redux just the loginHelloWorld action. This is because the login username and
// password don't need to be available to anyu other components.
export default connect(() => ({}), { submitLogin: loginHelloWorld })(HelloWorldLoginContainer);