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
import HelloWorldAction from './HelloWorldAction';
import HelloWorld from './HelloWorld';

// Here we have defined the "Hello World" container, this is responsible from making the "Hello World" HTTP request
// through Redux causing Redux to then re-render this container.
class HelloWorldContainer extends Component {

  // When this component is about to be mounted to the virtual DOM ask Redux to request the "Hello World" through the
  // bound async action.
  componentWillMount() {
    this.props.requestHelloWorld();
  }

  // Render this component using the Redux "text" property that was defined in the "propTypes" above.
  render() {
    const { text } = this.props;
    return (
      <HelloWorld text={text} />
    );
  }
}

// These are the properties for this JSX tag, though they aren't to be used directly, they are both populated by
// Redux which can be see bellow.
HelloWorldContainer.propTypes = {
  text: PropTypes.string,
  requestHelloWorld: PropTypes.func,
};

// Here we map the text value from the Redux state to the text property of this component. That actual mapping itself
// is carried out within the "connect()" call bellow.
const mapStateToProps = state => ({ text: state.text });

// Here is where we get Redux to bind all the properties for this container and also take control of the calls to the
// render method.
export default connect(mapStateToProps, { requestHelloWorld: HelloWorldAction })(HelloWorldContainer);
