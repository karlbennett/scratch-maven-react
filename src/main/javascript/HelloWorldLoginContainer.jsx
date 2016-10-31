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

  submitLogin(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.setState({ username: '', password: '' });
    this.props.submitLogin(username, password);
  }

  usernameOnChange(event) {
    this.setState({ username: event.target.value });
  }

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

export default connect(() => ({}), { submitLogin: loginHelloWorld })(HelloWorldLoginContainer);
