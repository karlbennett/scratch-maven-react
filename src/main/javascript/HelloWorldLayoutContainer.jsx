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
import HelloWorldLayout from './HelloWorldLayout';

// This container simply exists to bind the HelloWorldLayout component with Redux.
// eslint-disable-next-line react/prefer-stateless-function
class HelloWorldLayoutContainer extends Component {

  render() {
    // eslint-disable-next-line react/prop-types
    const { loggedIn, username, children } = this.props;
    return (
      <HelloWorldLayout loggedIn={loggedIn} username={username}>
        {children}
      </HelloWorldLayout>
    );
  }
}

HelloWorldLayoutContainer.propTypes = {
  username: PropTypes.string,
  loggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  username: state.username,
  loggedIn: state.loggedIn,
});

export default connect(mapStateToProps)(HelloWorldLayoutContainer);
