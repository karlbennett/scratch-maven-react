"use strict";

import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import HelloWorldAction from "./HelloWorldAction.js";
import HelloWorld from "./HelloWorld.js";

// Here we have defined the "Hello World" container, this is responsible from making the "Hello World" HTTP request
// through Redux causing Redux to then re-render this container.
class HelloWorldContainer extends Component {

    // These are the properties for this JSX tag, though they aren't to be used directly, they are both populated by
    // Redux which can be see bellow.
    static propTypes = {
        text: PropTypes.string,
        requestHelloWorld: PropTypes.func,
    };

    // When this component is about to be mounted to the virtual DOM ask Redux to request the "Hello World" through the
    // bound async action.
    componentWillMount() {
        this.props.requestHelloWorld();
    }

    // Render this component using the Redux "text" property that was defined in the "propTypes" above.
    render() {
        const {text} = this.props;
        return (
            <HelloWorld text={text}/>
        );
    }
}

// Here we map the text value from the Redux state to the text property of this component. That actual mapping itself
// is carried out within the "connect()" call bellow.
const mapStateToProps = (state) => {
    return {
        text: state.text
    }
};

// Here is where we get Redux to bind all the properties for this container and also take control of the calls to the
// render method.
export default connect(mapStateToProps, {HelloWorldAction})(HelloWorldContainer)


