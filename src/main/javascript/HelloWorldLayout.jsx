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

/* eslint-disable react/prop-types, react/jsx-indent */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// This component contains the wrapping for all the main pages on the web site. It uses the default 'children' React
// component property to allow it to be used to wrap other components
// e.g. <HelloWorldLayout><HelloWorld/></HelloWorldLayout>
const HelloWorldLayout = ({ loggedIn, username, children }) => (
  <div>
    <div className="hello_world_header">
      {loggedIn ?
        <div>
          <Link className="hello_world_logout" to={'/logout'}>Logout</Link>
          <p className="hello_world_username">{username}</p>
        </div> :
        <Link className="hello_world_login" to={'/login'}>Login</Link>
      }
    </div>
    <div className="hello_world_content">
      {children}
    </div>
  </div>
);

HelloWorldLayout.propTypes = {
  username: PropTypes.string,
  loggedIn: PropTypes.bool,
};

// It is possible to bind a simple stateless React component function with Redux as well as a Component class.
const mapStateToProps = state => ({
  username: state.username,
  loggedIn: state.loggedIn,
});

export default connect(mapStateToProps)(HelloWorldLayout);
