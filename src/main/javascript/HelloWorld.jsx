import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Here we create a JSX fragment that can be used within other React components as a tag e.g. <HelloWorld/>
const HelloWord = ({ text }) => (
  <div className="hello_world">
    <p><Link to={'/helloWorld'}>{text}</Link></p>
    <div className="hello_world_image" />
  </div>
);

// Here we define any properties for the fragment, these map to attributes within the tag
// e.g. <HelloWorld text={'some text'}/>
HelloWord.propTypes = {
  text: PropTypes.string,
};

export default HelloWord;
