import React, {PropTypes} from "react";

// Here we create a JSX fragment that can be used within other React components as a tag e.g. <HelloWorld/>
const HelloWord = ({text}) => (
    <div className="hello_world">
        <p>{text}</p>
    </div>
);

// Here we define any properties for the fragment, these map to attributes within the tag
// e.g. <HelloWorld text={'some text'}/>
HelloWord.propTypes = {
    text: PropTypes.string
};

export default HelloWord