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
import { requestHelloWorldSecret } from './HelloWorldActions';
import HelloWorld from './HelloWorld';

/**
 * This is exactly the same as the {@link HelloWorldContainer} except that it calls the secured 'Hello World' endpoint.
 */
class HelloWorldSecretContainer extends Component {

  componentWillMount() {
    this.props.requestHelloWorldSecret();
  }

  render() {
    const { secretText } = this.props;
    return (
      <HelloWorld text={secretText} linkUrl="/" linkText="Home" imageClassNames="hello_world_image secret" />
    );
  }
}

HelloWorldSecretContainer.propTypes = {
  secretText: PropTypes.string,
  requestHelloWorldSecret: PropTypes.func,
};

const mapStateToProps = state => ({ secretText: state.secretText });

const mapDispatchToProps = { requestHelloWorldSecret };

export default connect(mapStateToProps, mapDispatchToProps)(HelloWorldSecretContainer);
